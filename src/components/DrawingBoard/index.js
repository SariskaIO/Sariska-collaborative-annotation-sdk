// import React, { useState } from 'react'
// import { useStore } from '../../store';
// import Canvas from '../Canvas';

// const DrawingBoard = ({
//     pushMessage,
//     channel,
//     setCanvasCtx,
//     loading,
//     inputProps,
//     // onMouseDown,
//     // onMouseClick,
//     setStickerCanvasRef,
    
// }) => {
//     const [point, setPoint] = useState({});
//     const {
//       users: { user },
//       rooms: { room },
//     } = useStore();

//     return (
//         <div>
//         <Canvas 
//             width={inputProps.width}
//             height={inputProps.height}
//             pushMessage={pushMessage}
//             channel={channel}
//             setCanvasCtx={setCanvasCtx}
//             inputProps={inputProps}
//             // onMouseDown={onMouseDown}
//             // onMouseClick={onMouseClick}
//             setStickerCanvasRef={setStickerCanvasRef}
//           />
//        </div>
//     )
// }

// export default DrawingBoard


import React from 'react';
import { useSticker } from '../../hooks/useSticker'; // Adjust the path if necessary
import Canvas from '../Canvas';

const DrawingBoard = ({
    pushMessage,
    channel,
    setCanvasCtx,
    loading,
    inputProps,
}) => {
    // Use the useSticker hook
    const {
        positions,
        toggleEmoji,
        setStickerCanvasRef,
        selectedEmoji,
        setSelectedEmoji,
    } = useSticker(pushMessage, channel, setCanvasCtx, inputProps);

    return (
        <div>
            <Canvas 
                width={inputProps.width}
                height={inputProps.height}
                pushMessage={pushMessage}
                channel={channel}
                setCanvasCtx={setCanvasCtx}
                inputProps={inputProps}
                setStickerCanvasRef={setStickerCanvasRef}
                positions={positions}
                selectedEmoji={selectedEmoji}
                toggleEmoji={toggleEmoji}
                setSelectedEmoji={setSelectedEmoji}
            />
        </div>
    );
}

export default DrawingBoard;
