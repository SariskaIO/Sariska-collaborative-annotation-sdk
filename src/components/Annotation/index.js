import React, { useRef, useState, useEffect } from 'react';
import { ANNOTATION_TOOLS } from '../../constants';
import { getCanvasPosition, redraw } from '../../utils';

const Annotation = ({canvasRef, currentTool, canvasCtx, setCanvasCtx, width, height, zIndex, pushMessage, channel, otherProps}) => {
  const [drawing, setDrawing] = useState(false);
  const [paths, setPaths] = useState([]); // Store freehand paths
  const [currentPath, setCurrentPath] = useState([]); // Store current freehand path
  const [emojis, setEmojis] = useState([]); // Store emoji positions
  const [circles, setCircles] = useState([]); // Store circle data
  const [currentCircle, setCurrentCircle] = useState(null); // Store current circle being drawn
  const [annotation, setAnnotation] = useState([])
console.log('first annotation', annotation, paths, emojis, circles, currentTool);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setCanvasCtx(context);
    console.log('test log', annotation)
    const handleResize = () => {
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      redraw(context, canvasRef, annotation); // Redraw existing drawings based on new size
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial canvas size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [paths, emojis, circles, annotation]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = getCanvasPosition(e, canvasRef);
    if (currentTool === ANNOTATION_TOOLS.pen) {
      setDrawing(true);
      const canvas = canvasRef.current;
      const startXPercent = offsetX / canvas.width; // Store percentage-based coordinates
      const startYPercent = offsetY / canvas.height;
      setCurrentPath([{ x: startXPercent, y: startYPercent }]);
      canvasCtx.beginPath();
      canvasCtx.moveTo(offsetX, offsetY);
      if(channel){
        pushMessage(JSON.stringify({ ctx: canvasCtx, pen: { x: offsetX, y: offsetY}, props: otherProps, annotation }), channel);
      }
    } else if (currentTool === ANNOTATION_TOOLS.circle) {
      const canvas = canvasRef.current;
      const centerXPercent = offsetX / canvas.width;
      const centerYPercent = offsetY / canvas.height;
      setCurrentCircle({ x: centerXPercent, y: centerYPercent, radius: 0 });
      console.log('startDrawing', annotation);
      setAnnotation(prev => [
            ...(Array.isArray(prev) ? prev : []),
            {type: 'currentCircle', ctx: canvasCtx, circle: { x: centerXPercent, y: centerYPercent, radius: 0 }}]
      )
      if(channel){
        pushMessage(JSON.stringify({ ctx: canvasCtx, circle: { x: centerXPercent, y: centerYPercent, radius: 0 }, props: otherProps, annotation }), channel);
      }
      // setAnnotation(prev => [
      //       ...(Array.isArray(prev) ? prev : []),
      //       {type: 'currentCircle', ctx: canvasCtx, circle: { x: centerXPercent, y: centerYPercent, radius: 0 }}]
      // )
      setDrawing(true);
    }
  };

  const draw = (e) => {
    if (currentTool === ANNOTATION_TOOLS.pen && drawing) {
      const { offsetX, offsetY } = getCanvasPosition(e, canvasRef);
      canvasCtx.lineTo(offsetX, offsetY);
      canvasCtx.strokeStyle = 'red';
      canvasCtx.lineWidth = 2;
      canvasCtx.stroke();

      const canvas = canvasRef.current;
      const xPercent = offsetX / canvas.width;
      const yPercent = offsetY / canvas.height;
      setCurrentPath((prevPath) => [...prevPath, { x: xPercent, y: yPercent }]);
      if(channel){
        pushMessage(JSON.stringify({ ctx: canvasCtx, pen: { x: offsetX, y: offsetY}, props: otherProps, annotation }), channel);
      }
    } else if (currentTool === ANNOTATION_TOOLS.circle && drawing) {
      console.log('first draw', annotation, currentCircle)
      const { offsetX, offsetY } = getCanvasPosition(e, canvasRef);
      const canvas = canvasRef.current;
      const radiusPercent = Math.sqrt(
        Math.pow(offsetX / canvas.width - currentCircle.x, 2) +
        Math.pow(offsetY / canvas.height - currentCircle.y, 2)
      );
      setCurrentCircle((prevCircle) => ({ ...prevCircle, radius: radiusPercent }));
      if(annotation && annotation?.length){
        setAnnotation(prev => {
            return prev.map((item) => {
              if(item.type === 'currentCircle') {
              if(channel){
                pushMessage(JSON.stringify({ ctx: canvasCtx, circle: { ...item.circle, radius: radiusPercent }, props: otherProps, annotation }), channel);
              }
                return { ...item, circle: { ...item.circle, radius: radiusPercent } } 
              }else{
                return item
              }
            }
            );
          }
        )
      }
      redraw(canvasCtx, canvasRef, annotation); // Redraw everything on each mouse move to update the circle
    }
  };

  const stopDrawing = () => {
    if (currentTool === ANNOTATION_TOOLS.pen && drawing) {
      setDrawing(false);
      canvasCtx.closePath();
      setPaths((prevPaths) => [...prevPaths, currentPath]);
      setAnnotation(prev => ([...prev, {type: 'pen', ctx: canvasCtx, pen: currentPath }]));
      if(channel){
        pushMessage(JSON.stringify({ ctx: canvasCtx, pen: currentPath, props: otherProps, annotation }), channel);
      }
    } else if (currentTool === ANNOTATION_TOOLS.circle && currentCircle) {
      setCircles((prevCircles) => [...prevCircles, currentCircle]);
      console.log('ANNOTATION_TOOLS', annotation);
      setAnnotation((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { type: 'circle', ctx: canvasCtx, circle: currentCircle },
      ]);
      if(channel){
        pushMessage(JSON.stringify({ ctx: canvasCtx, circle: currentCircle, props: otherProps, annotation }), channel);
      }
      setCurrentCircle(null); // Reset the current circle
      setAnnotation(prev => {
          return prev.filter((item) => item.type !== 'currentCircle');
        }
      )
      setDrawing(false);
    }
  };

  const placeEmoji = (e) => {
    const { offsetX, offsetY } = getCanvasPosition(e, canvasRef);
    const canvas = canvasRef.current;
    const xPercent = offsetX / canvas.width;
    const yPercent = offsetY / canvas.height;
    console.log('xPercent', xPercent)
    setEmojis((prevEmojis) => [...prevEmojis, { x: xPercent, y: yPercent, emoji: '😀' }]);
    setAnnotation((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      { type: 'emoji', ctx: canvasCtx, emoji: { x: xPercent, y: yPercent, emoji: '😀' } },
    ]);
    redraw(canvasCtx, canvasRef, [...annotation, {type: 'emoji', ctx: canvasCtx, emoji: { x: xPercent, y: yPercent, emoji: '😀' }}]); // Redraw to immediately show the emoji
    if(channel){
      pushMessage(JSON.stringify({ ctx: canvasCtx, emoji: { x: xPercent, y: yPercent, emoji: '😀' }, props: otherProps, annotation }), channel);
    }
  };

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