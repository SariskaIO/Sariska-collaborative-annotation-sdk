import React from 'react';
import { useOnDraw } from '../../hooks/useOnDraw';

const Canvas = ({
    width, 
    height, 
    pushMessage,
    channel,
    setCanvasCtx,
    inputProps
  }) => {
    const {children, ...otherProps} = inputProps;
    const {setCanvasRef, onMouseDown} = useOnDraw(
      pushMessage,
      channel,
      setCanvasCtx,
      otherProps
      );
      
    const canvasStyle={
      position: 'absolute', 
      zIndex: otherProps.zIndex
    }
  return (
        <>
        <canvas 
            width={width}
            height={height}
            style={canvasStyle}
            ref={setCanvasRef}
            onMouseDown={onMouseDown}
            onClick={()=>console.log('clicked on canvas' )}
        />
          {children}
        </>
  )
}

export default Canvas

