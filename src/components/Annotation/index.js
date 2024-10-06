import React, { useRef, useState, useEffect } from 'react';
import { ANNOTATION_TOOLS } from '../../constants';

const Annotation = ({canvasRef, setCtx, currentTool, ctx, width, height, zIndex, pushMessage, channel, setCanvasCtx}) => {
  const [drawing, setDrawing] = useState(false);
  const [paths, setPaths] = useState([]); // Store freehand paths
  const [currentPath, setCurrentPath] = useState([]); // Store current freehand path
  const [emojis, setEmojis] = useState([]); // Store emoji positions
  const [circles, setCircles] = useState([]); // Store circle data
  const [currentCircle, setCurrentCircle] = useState(null); // Store current circle being drawn

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setCtx(context);

    const handleResize = () => {
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      redraw(context); // Redraw existing drawings based on new size
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial canvas size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [paths, emojis, circles]);

  const startDrawing = (e) => {
    if (currentTool === ANNOTATION_TOOLS.pen) {
      setDrawing(true);
      const { offsetX, offsetY } = getCanvasPosition(e);
      const canvas = canvasRef.current;
      const startXPercent = offsetX / canvas.width; // Store percentage-based coordinates
      const startYPercent = offsetY / canvas.height;
      setCurrentPath([{ x: startXPercent, y: startYPercent }]);
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    } else if (currentTool === ANNOTATION_TOOLS.circle) {
      const { offsetX, offsetY } = getCanvasPosition(e);
      const canvas = canvasRef.current;
      const centerXPercent = offsetX / canvas.width;
      const centerYPercent = offsetY / canvas.height;
      setCurrentCircle({ x: centerXPercent, y: centerYPercent, radius: 0 });
      setDrawing(true);
    }
  };

  const draw = (e) => {
    console.log('first draw')
    if (currentTool === ANNOTATION_TOOLS.pen && drawing) {
      const { offsetX, offsetY } = getCanvasPosition(e);
      ctx.lineTo(offsetX, offsetY);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.stroke();

      const canvas = canvasRef.current;
      const xPercent = offsetX / canvas.width;
      const yPercent = offsetY / canvas.height;
      setCurrentPath((prevPath) => [...prevPath, { x: xPercent, y: yPercent }]);
    } else if (currentTool === ANNOTATION_TOOLS.circle && drawing) {
      const { offsetX, offsetY } = getCanvasPosition(e);
      const canvas = canvasRef.current;
      const radiusPercent = Math.sqrt(
        Math.pow(offsetX / canvas.width - currentCircle.x, 2) +
        Math.pow(offsetY / canvas.height - currentCircle.y, 2)
      );
      setCurrentCircle((prevCircle) => ({ ...prevCircle, radius: radiusPercent }));
      redraw(ctx); // Redraw everything on each mouse move to update the circle
    }
  };

  const stopDrawing = () => {
    if (currentTool === ANNOTATION_TOOLS.pen && drawing) {
      setDrawing(false);
      ctx.closePath();
      setPaths((prevPaths) => [...prevPaths, currentPath]);
    } else if (currentTool === ANNOTATION_TOOLS.circle && currentCircle) {
      setCircles((prevCircles) => [...prevCircles, currentCircle]);
      setCurrentCircle(null); // Reset the current circle
      setDrawing(false);
    }
  };

  const placeEmoji = (e) => {
    const { offsetX, offsetY } = getCanvasPosition(e);
    const canvas = canvasRef.current;
    const xPercent = offsetX / canvas.width;
    const yPercent = offsetY / canvas.height;
    console.log('xPercent', xPercent)
    setEmojis((prevEmojis) => [...prevEmojis, { x: xPercent, y: yPercent, emoji: '😀' }]);
    redraw(ctx); // Redraw to immediately show the emoji
  };

  const getCanvasPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
  };

  const redraw = (context) => {
    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Redraw freehand paths
    paths.forEach((path) => {
      if (path.length > 0) {
        const startX = path[0].x * canvas.width;
        const startY = path[0].y * canvas.height;
        context.beginPath();
        context.moveTo(startX, startY);

        path.forEach((point) => {
          const x = point.x * canvas.width;
          const y = point.y * canvas.height;
          context.lineTo(x, y);
        });

        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
      }
    });

    // Redraw circles
    circles.forEach((circle) => {
      const centerX = circle.x * canvas.width;
      const centerY = circle.y * canvas.height;
      const radius = circle.radius * canvas.width; // Using width scaling for simplicity
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.strokeStyle = 'blue';
      context.lineWidth = 2;
      context.stroke();
      context.closePath();
    });

    // Redraw emojis
    emojis.forEach((emoji) => {
      const x = emoji.x * canvas.width;
      const y = emoji.y * canvas.height;
      context.font = '30px Arial';
      context.fillText(emoji.emoji, x-15,y+15);
    });

    // If currently drawing a circle, draw it
    if (currentCircle) {
      const centerX = currentCircle.x * canvas.width;
      const centerY = currentCircle.y * canvas.height;
      const radius = currentCircle.radius * canvas.width;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.strokeStyle = 'blue';
      context.lineWidth = 2;
      context.stroke();
      context.closePath();
    }
  };
console.log('currenyTool', currentTool)
  return (
      <canvas
        ref={canvasRef}
        style={{ 
          zIndex,
          background: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        //  pointerEvents: 'none', // Allows clicks to pass through the canvas to the image
        }}
        onMouseDown={(e) => {
          if (currentTool === ANNOTATION_TOOLS.emoji) {
            placeEmoji(e);
          } else {
            startDrawing(e);
          }
        }}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
  );
};

export default Annotation;