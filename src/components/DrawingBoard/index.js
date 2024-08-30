import React, { useState } from 'react'
import { useStore } from '../../store';
import Canvas from '../Canvas';

const DrawingBoard = ({
    pushMessage,
    channel,
    setCanvasCtx,
    remoteTextboxes,
    loading,
    inputProps
}) => {
    const [point, setPoint] = useState({});
    const {
      users: { user },
      rooms: { room },
    } = useStore();
    
    return (
        <Canvas 
            width={inputProps.width}
            height={inputProps.height}
            pushMessage={pushMessage}
            channel={channel}
            setCanvasCtx={setCanvasCtx}
            inputProps={inputProps}
            remoteTextboxes={remoteTextboxes}
        />
    )
}

export default DrawingBoard