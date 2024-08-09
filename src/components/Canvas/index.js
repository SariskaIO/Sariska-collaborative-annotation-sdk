import React from 'react';
import { useOnDraw } from '../../hooks/useOnDraw';
import { useSticker } from '../../hooks/useSticker';

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
      const { enableEmoji, disableEmoji, onHandleClick ,emojiPositions } = useSticker(
        pushMessage,
        channel,
        ctx,
        otherProps
      );
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
            enableEmoji={enableEmoji}
            disableEmoji={disableEmoji}
            onHandleClick={onHandleClick}
            emojiPositions={emojiPositions}
        />
          {children}
        </>
  )
}

export default Canvas

