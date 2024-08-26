import React from 'react';
import { useOnDraw } from '../../hooks/useOnDraw';
// import { ANNOTATION_TOOLS } from '../../constants';
// import { useOnEmoji } from '../../hooks/useOnEmoji';
// import { useOnCircle } from '../../hooks/useOnCircle';

const Canvas = ({
    width, 
    height, 
    pushMessage,
    channel,
    setCanvasCtx,
    inputProps
  }) => {
    const {children, annotationTool, ...otherProps} = inputProps;
    //const emojiHook = useOnEmoji(pushMessage, channel, setCanvasCtx, otherProps);
    //const circleHook = useOnCircle(pushMessage, channel, setCanvasCtx, otherProps);
    //const drawHook = useOnDraw(pushMessage, channel, setCanvasCtx, otherProps);
   
  // Use logic to select the correct hook result
  const { setCanvasRef, onMouseDown } = useOnDraw(pushMessage, channel, setCanvasCtx, otherProps);
  // annotationTool === ANNOTATION_TOOLS.emoji ? emojiHook : 
  // annotationTool === ANNOTATION_TOOLS.circle ? circleHook :
  // drawHook;
      
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

