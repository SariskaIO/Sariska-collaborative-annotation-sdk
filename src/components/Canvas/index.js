import React, { useRef, useState } from 'react';
import { useOnDraw } from '../../hooks/useOnDraw';
 import { ANNOTATION_TOOLS } from '../../constants';
 import { useOnEmoji } from '../../hooks/useOnEmoji';
 import { useOnCircle } from '../../hooks/useOnCircle';
import { useOnTextBox } from '../../hooks/useOnTextBox';
import { makeStyles } from '@material-ui/core';
import Annotation from '../Annotation';

const Canvas = ({
    width, 
    height, 
    pushMessage,
    channel,
    canvasRef,
    canvasCtx,
    setCanvasCtx,
    inputProps,
    remoteTextboxes
  }) => {
    const {children, ...otherProps} = inputProps;
    let currentTool = inputProps.annotationTool; // 'freehand', 'emoji', 'circle'
  //   const [annotations, setAnnotations] = useState([]);
  //   const emojiHook = useOnEmoji(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
  //   const circleHook = useOnCircle(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
  //   const textboxHook = useOnTextBox(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
  //   const drawHook = useOnDraw(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
    
  // // Use logic to select the correct hook result
  // const { setCanvasRef, onMouseDown, handleTextChange, textboxes } = 
  // inputProps.annotationTool === ANNOTATION_TOOLS.emoji ? emojiHook : 
  // inputProps.annotationTool === ANNOTATION_TOOLS.circle ? circleHook :
  // inputProps.annotationTool === ANNOTATION_TOOLS.textbox ? textboxHook : 
  // drawHook;
    const canvasStyle={
      position: 'absolute', 
      zIndex: otherProps.zIndex,
      background: 'none'
    }
  // let drawnTextboxes = annotations?.length && annotations?.filter(annotation => annotation.type === ANNOTATION_TOOLS.textbox.toLowerCase())?.map(annotation => annotation.textbox);
  // let textboxList = textboxes?.length ? textboxes : remoteTextboxes?.length ? remoteTextboxes : drawnTextboxes?.length ? drawnTextboxes : [];
  
//   const useStyles = makeStyles(() => ({
//     textArea: {
//       position: 'absolute',
//       resize: 'none',
//       overflow: 'hidden',
//       boxSizing: 'border-box',
//       zIndex: otherProps.zIndex,
//       '&:focus-visible': {
//             outlineOffset: otherProps.isModeratorLocal && '0px',
//             outline: otherProps.isModeratorLocal ? '-webkit-focus-ring-color auto 1px' : 'none'
//       },
//       '&:focus': {
//             outline: otherProps.isModeratorLocal ? '-webkit-focus-ring-color auto 1px' : 'none'
//       }
//     }
//   }))
//  const classes = useStyles();

  return (
        <>
        <Annotation 
          canvasRef={canvasRef} 
          currentTool={currentTool} 
          canvasCtx={canvasCtx} 
          setCanvasCtx={setCanvasCtx}
          width={width}
          height={height}
          zIndex={otherProps.zIndex}
          pushMessage={pushMessage} 
          channel={channel} 
          otherProps={otherProps}
        />
        {/* <canvas 
            width={width}
            height={height}
            style={canvasStyle}
            ref={canvasRef}
            onMouseDown={onMouseDown}
        /> */}
      {/*  {textboxList?.length ? textboxList?.map((textbox) => (
                <textarea
                    key={textbox.id}
                    className={classes.textArea}
                    value={textbox.text}
                    onChange={(e) => handleTextChange(e, textbox.id)}
                    autoFocus={otherProps.isModeratorLocal}
                    readOnly={!otherProps.isModeratorLocal}
                    style={{
                      top: textbox.y + 'px',
                      left: textbox.x + 'px',
                      width: textbox.width + 'px',
                      height: textbox.height + 'px',
                      maxWidth: `${Math.min(200, 600 - textbox.x)}px`,
                      maxHeight: `${Math.min(96, 500 - textbox.y)}px`,
                    }}
                />
            )) : null}*/}
          {children}
        </>
  )
}

export default Canvas

// import React, { useEffect, useRef, useState } from 'react';
// import { useOnDraw } from '../../hooks/useOnDraw';
//  import { ANNOTATION_TOOLS } from '../../constants';
//  import { useOnEmoji } from '../../hooks/useOnEmoji';
//  import { useOnCircle } from '../../hooks/useOnCircle';
// import { useOnTextBox } from '../../hooks/useOnTextBox';
// import { makeStyles } from '@material-ui/core';

// const Canvas = ({
//     width, 
//     height, 
//     pushMessage,
//     channel,
//     setCanvasCtx,
//     inputProps,
//     remoteTextboxes
//   }) => {
//     const {children, ...otherProps} = inputProps;
//     const [annotations, setAnnotations] = useState([]);
//     // const emojiHook = useOnEmoji(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
//     // const circleHook = useOnCircle(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
//     // const textboxHook = useOnTextBox(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
//     // const drawHook = useOnDraw(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
    
//   // Use logic to select the correct hook result
//   // const { setCanvasRef, onMouseDown, handleTextChange, textboxes } = 
//   // inputProps.annotationTool === ANNOTATION_TOOLS.emoji ? emojiHook : 
//   // inputProps.annotationTool === ANNOTATION_TOOLS.circle ? circleHook :
//   // inputProps.annotationTool === ANNOTATION_TOOLS.textbox ? textboxHook : 
//   // drawHook;
  
//   const canvasStyle={
//     position: 'absolute', 
//     zIndex: otherProps.zIndex,
//     background: 'none'
//   }

//   // let drawnTextboxes = annotations?.length && annotations?.filter(annotation => annotation.type === ANNOTATION_TOOLS.textbox.toLowerCase())?.map(annotation => annotation.textbox);
//   // let textboxList = textboxes?.length ? textboxes : remoteTextboxes?.length ? remoteTextboxes : drawnTextboxes?.length ? drawnTextboxes : [];

//   const canvasRef = useRef(null);
//   const [drawing, setDrawing] = useState(false);
//   const [mode, setMode] = useState(inputProps.annotationTool); // Modes: "freehand", "circle", "emoji"
//   const [paths, setPaths] = useState([]); // Store freehand paths
//   const [circles, setCircles] = useState([]); // Store circles
//   const [emojis, setEmojis] = useState([]); // Store emojis
//   const [currentPath, setCurrentPath] = useState([]); // Store the current path being drawn
//   const [startPos, setStartPos] = useState(null); // For circle: starting position
//   const [emoji, setEmoji] = useState("😊"); // Default emoji
//   const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

//   // Function to handle window resize
//   const handleResize = () => {
//     const newWidth = window.innerWidth;
//     const newHeight = window.innerHeight;

//     const scaleX = newWidth / canvasSize.width;
//     const scaleY = newHeight / canvasSize.height;

//     const scaledPaths = paths.map((path) =>
//       path.map(([x, y]) => [x * scaleX, y * scaleY])
//     );

//     const scaledCircles = circles.map((circle) => ({
//       x: circle.x * scaleX,
//       y: circle.y * scaleY,
//       radius: circle.radius * Math.min(scaleX, scaleY),
//     }));

//     const scaledEmojis = emojis.map((emoji) => ({
//       ...emoji,
//       x: emoji.x * scaleX,
//       y: emoji.y * scaleY
//     }));

//     setCanvasSize({ width: newWidth, height: newHeight });
//     setPaths(scaledPaths);
//     setCircles(scaledCircles);
//     setEmojis(scaledEmojis);
//   };

//   useEffect(() => {
//     setMode(inputProps.annotationTool);
//   },[inputProps.annotationTool])

//   useEffect(() => {
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [paths, circles, emojis, canvasSize, inputProps.annotationTool]);

//   // Start drawing, creating a circle, or placing an emoji
//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     console.log('startDrawing')
//     setDrawing(true);

//     if (mode === ANNOTATION_TOOLS.pen) {
//       setCurrentPath([[offsetX, offsetY]]);
//     } else if (mode === ANNOTATION_TOOLS.circle) {
//       setStartPos({ x: offsetX, y: offsetY });
//     } else if (mode === ANNOTATION_TOOLS.emoji) {
//       setEmojis((prevEmojis) => [...prevEmojis, { x: offsetX, y: offsetY, emoji: emoji }]);
//     }
//   };

//   // Continue drawing or update the circle radius
//   const draw = ({ nativeEvent }) => {
//     if (!drawing) return;
// console.log('draw')
//     const { offsetX, offsetY } = nativeEvent;

//     if (mode === ANNOTATION_TOOLS.pen) {
//       setCurrentPath((prevPath) => [...prevPath, [offsetX, offsetY]]);
//     } else if (mode === ANNOTATION_TOOLS.circle && startPos) {
//       const radius = Math.sqrt(
//         Math.pow(offsetX - startPos.x, 2) + Math.pow(offsetY - startPos.y, 2)
//       );
//       drawCircle(startPos.x, startPos.y, radius);
//     }
//   };

//   // Stop drawing and save the path or circle
//   const stopDrawing = ({ nativeEvent }) => {
//     if (!drawing) return;
//     console.log('stopDrawing')
//     setDrawing(false);

//     if (mode === ANNOTATION_TOOLS.pen) {
//       setPaths((prevPaths) => [...prevPaths, currentPath]);
//       setCurrentPath([]);
//     } else if (mode === ANNOTATION_TOOLS.circle && startPos) {
//       const { offsetX, offsetY } = nativeEvent;
//       const radius = Math.sqrt(
//         Math.pow(offsetX - startPos.x, 2) + Math.pow(offsetY - startPos.y, 2)
//       );
//       setCircles((prevCircles) => [
//         ...prevCircles,
//         { x: startPos.x, y: startPos.y, radius: radius },
//       ]);
//       setStartPos(null);
//     }
//   };

//   // Draw the saved freehand paths
//   const drawPaths = (ctx) => {
//     paths.forEach((path) => {
//       ctx.beginPath();
//       path.forEach(([x, y], index) => {
//         if (index === 0) {
//           ctx.moveTo(x, y);
//         } else {
//           ctx.lineTo(x, y);
//         }
//       });
//       ctx.stroke();
//     });
//   };

//   // Draw the saved circles
//   const drawCircles = (ctx) => {
//     circles.forEach(({ x, y, radius }) => {
//       ctx.beginPath();
//       ctx.arc(x, y, radius, 0, Math.PI * 2);
//       ctx.stroke();
//     });
//   };

//   // Draw the saved emojis
//   const drawEmojis = (ctx) => {
//     emojis.forEach(({ x, y, emoji }) => {
//       ctx.font = "40px Arial";
//       ctx.fillText(emoji, x - 20, y + 20); // Adjust for emoji size
//     });
//   };

//   // Draw a temporary circle (while dragging)
//   const drawCircle = (x, y, radius) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawPaths(ctx);
//     drawCircles(ctx);
//     drawEmojis(ctx);
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI * 2);
//     ctx.stroke();
//   };

//   // Redraw everything on every render
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setCanvasCtx(ctx);

//     drawPaths(ctx);
//     drawCircles(ctx);
//     drawEmojis(ctx);

//     if (currentPath.length > 0) {
//       ctx.beginPath();
//       currentPath.forEach(([x, y], index) => {
//         if (index === 0) {
//           ctx.moveTo(x, y);
//         } else {
//           ctx.lineTo(x, y);
//         }
//       });
//       ctx.stroke();
//     }
//   }, [paths, circles, emojis, currentPath, canvasSize]);
  
//   const useStyles = makeStyles(() => ({
//     textArea: {
//       position: 'absolute',
//       resize: 'none',
//       overflow: 'hidden',
//       boxSizing: 'border-box',
//       zIndex: otherProps.zIndex,
//       '&:focus-visible': {
//             outlineOffset: otherProps.isModeratorLocal && '0px',
//             outline: otherProps.isModeratorLocal ? '-webkit-focus-ring-color auto 1px' : 'none'
//       },
//       '&:focus': {
//             outline: otherProps.isModeratorLocal ? '-webkit-focus-ring-color auto 1px' : 'none'
//       }
//     }
//   }))
//  const classes = useStyles();

//   return (
//         <>
//         <canvas 
//             style={canvasStyle}
//             ref={canvasRef}
//             width={canvasSize.width}
//             height={canvasSize.height}
//             onMouseDown={startDrawing}
//             onMouseMove={draw}
//             onMouseUp={stopDrawing}
//             onMouseLeave={stopDrawing} // Stop drawing if the mouse leaves the canvas
//         />
//         {/* {textboxList?.length ? textboxList?.map((textbox) => (
//                 <textarea
//                     key={textbox.id}
//                     className={classes.textArea}
//                     value={textbox.text}
//                     onChange={(e) => handleTextChange(e, textbox.id)}
//                     autoFocus={otherProps.isModeratorLocal}
//                     readOnly={!otherProps.isModeratorLocal}
//                     style={{
//                       top: textbox.y + 'px',
//                       left: textbox.x + 'px',
//                       width: textbox.width + 'px',
//                       height: textbox.height + 'px',
//                       maxWidth: `${Math.min(200, 600 - textbox.x)}px`,
//                       maxHeight: `${Math.min(96, 500 - textbox.y)}px`,
//                     }}
//                 />
//             )) : null} */}
//           {children}
//         </>
//   )
// }

// export default Canvas

// import React, { useState } from 'react';
// import { useOnDraw } from '../../hooks/useOnDraw';
//  import { ANNOTATION_TOOLS } from '../../constants';
//  import { useOnEmoji } from '../../hooks/useOnEmoji';
//  import { useOnCircle } from '../../hooks/useOnCircle';
// import { useOnTextBox } from '../../hooks/useOnTextBox';
// import { makeStyles } from '@material-ui/core';

// const Canvas = ({
//     width, 
//     height, 
//     pushMessage,
//     channel,
//     setCanvasCtx,
//     inputProps,
//     remoteTextboxes
//   }) => {
//     const {children, ...otherProps} = inputProps;
//     const [annotations, setAnnotations] = useState([]);
//     const emojiHook = useOnEmoji(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
//     const circleHook = useOnCircle(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
//     const textboxHook = useOnTextBox(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
//     const drawHook = useOnDraw(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
    
//   // Use logic to select the correct hook result
//   const { setCanvasRef, onMouseDown, handleTextChange, textboxes } = 
//   inputProps.annotationTool === ANNOTATION_TOOLS.emoji ? emojiHook : 
//   inputProps.annotationTool === ANNOTATION_TOOLS.circle ? circleHook :
//   inputProps.annotationTool === ANNOTATION_TOOLS.textbox ? textboxHook : 
//   drawHook;
  
//     const canvasStyle={
//       position: 'absolute', 
//       zIndex: otherProps.zIndex,
//       background: 'none'
//     }
//   let drawnTextboxes = annotations?.length && annotations?.filter(annotation => annotation.type === ANNOTATION_TOOLS.textbox.toLowerCase())?.map(annotation => annotation.textbox);
//   let textboxList = textboxes?.length ? textboxes : remoteTextboxes?.length ? remoteTextboxes : drawnTextboxes?.length ? drawnTextboxes : [];
  
//   const useStyles = makeStyles(() => ({
//     textArea: {
//       position: 'absolute',
//       resize: 'none',
//       overflow: 'hidden',
//       boxSizing: 'border-box',
//       zIndex: otherProps.zIndex,
//       '&:focus-visible': {
//             outlineOffset: otherProps.isModeratorLocal && '0px',
//             outline: otherProps.isModeratorLocal ? '-webkit-focus-ring-color auto 1px' : 'none'
//       },
//       '&:focus': {
//             outline: otherProps.isModeratorLocal ? '-webkit-focus-ring-color auto 1px' : 'none'
//       }
//     }
//   }))
//  const classes = useStyles();

//   return (
//         <>
//         <canvas 
//             width={width}
//             height={height}
//             style={canvasStyle}
//             ref={setCanvasRef}
//             onMouseDown={onMouseDown}
//         />
//         {textboxList?.length ? textboxList?.map((textbox) => (
//                 <textarea
//                     key={textbox.id}
//                     className={classes.textArea}
//                     value={textbox.text}
//                     onChange={(e) => handleTextChange(e, textbox.id)}
//                     autoFocus={otherProps.isModeratorLocal}
//                     readOnly={!otherProps.isModeratorLocal}
//                     style={{
//                       top: textbox.y + 'px',
//                       left: textbox.x + 'px',
//                       width: textbox.width + 'px',
//                       height: textbox.height + 'px',
//                       maxWidth: `${Math.min(200, 600 - textbox.x)}px`,
//                       maxHeight: `${Math.min(96, 500 - textbox.y)}px`,
//                     }}
//                 />
//             )) : null}
//           {children}
//         </>
//   )
// }

// export default Canvas

