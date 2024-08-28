import React, { useState } from 'react';
import { useOnDraw } from '../../hooks/useOnDraw';
 import { ANNOTATION_TOOLS } from '../../constants';
 import { useOnEmoji } from '../../hooks/useOnEmoji';
 import { useOnCircle } from '../../hooks/useOnCircle';

const Canvas = ({
    width, 
    height, 
    pushMessage,
    channel,
    setCanvasCtx,
    inputProps
  }) => {
    const {children, annotationTool, ...otherProps} = inputProps;
    const [annotations, setAnnotations] = useState([]);
    const emojiHook = useOnEmoji(pushMessage, channel, setCanvasCtx, setAnnotations, otherProps);
    const circleHook = useOnCircle(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
    const drawHook = useOnDraw(pushMessage, channel, setCanvasCtx, setAnnotations, otherProps);
    console.log('annotaiotnsa', annotations);
  // Use logic to select the correct hook result
  const { setCanvasRef, onMouseDown } = 
  annotationTool === ANNOTATION_TOOLS.emoji ? emojiHook : 
  annotationTool === ANNOTATION_TOOLS.circle ? circleHook :
  drawHook;
      
    const canvasStyle={
      position: 'absolute', 
      zIndex: otherProps.zIndex,
      background: 'none'
    }
  return (
        <>
        <canvas 
            width={width}
            height={height}
            style={canvasStyle}
            ref={setCanvasRef}
            onMouseDown={onMouseDown}
        />
          {children}
        </>
  )
}

export default Canvas

