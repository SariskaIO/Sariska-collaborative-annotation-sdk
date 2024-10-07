import React, { useState } from 'react'
import { useStore } from '../../store';
import Canvas from '../Canvas';

const DrawingBoard = ({
    pushMessage,
    channel,
    canvasCtx,
    setCanvasCtx,
    remoteTextboxes,
    loading,
    inputProps,
    canvasRef
}) => {
    
    return (
        <Canvas 
            width={inputProps.width}
            height={inputProps.height}
            pushMessage={pushMessage}
            channel={channel}
            canvasRef={canvasRef}
            canvasCtx={canvasCtx}
            setCanvasCtx={setCanvasCtx}
            inputProps={inputProps}
            remoteTextboxes={remoteTextboxes}
        />
    )
}

export default DrawingBoard