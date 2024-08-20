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

 import React, { useState } from 'react'
import { useSticker } from '../../hooks/useSticker';
import Canvas from '../Canvas';
import { useStore } from '../../store';

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

    return (
        <div>
            <Canvas 
                width={inputProps.width}
                height={inputProps.height}
                pushMessage={pushMessage}
                channel={channel}
                setCanvasCtx={setCanvasCtx}
                inputProps={inputProps}
                // positions={positions}
                // selectedEmoji={selectedEmoji}
                // // toggleEmoji={toggleEmoji}
                // setSelectedEmoji={setSelectedEmoji}
            />
        </div>
    );
}

export default DrawingBoard;
