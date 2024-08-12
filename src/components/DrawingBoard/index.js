import React, { useState } from 'react'
import { useStore } from '../../store';
import Canvas from '../Canvas';
import { useSticker } from '../../hooks/useSticker';

const DrawingBoard = ({
    pushMessage,
    channel,
    setCanvasCtx,
    loading,
    inputProps,

}) => {
    const [point, setPoint] = useState({});
    const {
      users: { user },
      rooms: { room },
    } = useStore();

    const { selectedEmoji, setSelectedEmoji, onMouseDown, emojiPositions } = useSticker(pushMessage, channel);


    return (
        <div>
        <Canvas 
            width={inputProps.width}
            height={inputProps.height}
            pushMessage={pushMessage}
            channel={channel}
            setCanvasCtx={setCanvasCtx}
            inputProps={inputProps}
            selectedEmoji={selectedEmoji}
            setSelectedEmoji={setSelectedEmoji}
            onMouseDown={onMouseDown}
            emojiPositions={emojiPositions}
          />
       </div>
    )
}

export default DrawingBoard