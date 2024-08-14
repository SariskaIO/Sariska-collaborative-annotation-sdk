import React, { useState } from 'react'
import { useStore } from '../../store';
import Canvas from '../Canvas';

const DrawingBoard = ({
    pushMessage,
    channel,
    setCanvasCtx,
    loading,
    inputProps,
    onMouseDown,
    setStickerCanvasRef,
    handleClick
}) => {
    const [point, setPoint] = useState({});
    const {
      users: { user },
      rooms: { room },
    } = useStore();

    return (
        <div>
        <Canvas 
            width={inputProps.width}
            height={inputProps.height}
            pushMessage={pushMessage}
            channel={channel}
            setCanvasCtx={setCanvasCtx}
            inputProps={inputProps}
            onMouseDown={onMouseDown}
            onClick={handleClick}
            setStickerCanvasRef={setStickerCanvasRef}
          />
       </div>
    )
}

export default DrawingBoard