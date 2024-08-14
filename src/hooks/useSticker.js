

// import { useEffect, useRef, useState } from "react";
// import { computePointInCanvas, onSticker } from "../utils";

// export function useSticker(pushMessage, channel, setCanvasCtx, otherProps) {
//   const [emoji, setEmoji] = useState(false);
//   const [positions, setPositions] = useState([]);
//   const [selectedEmoji, setSelectedEmoji] = useState("😊");
//   const canvasRef = useRef(null);
//   const prevPointRef = useRef();
//   const isStickRef = useRef(false);
//   const handleClickRef = useRef();

//   const toggleEmoji = () => {
//     setEmoji((prev) => !prev);
//   };

//   useEffect(() => {
//     const ctx = canvasRef.current && canvasRef.current.getContext("2d");
//     const { parentCanvasRef, ...props } = otherProps;

//     if (ctx) {
//       parentCanvasRef.current = canvasRef.current;
//       setCanvasCtx(ctx);
//     }

//     function handleClick(e) {
//       if (!canvasRef.current || !emoji) return;

//       isStickRef.current = true;

//       const newEmojiPosition = computePointInCanvas(
//         e.clientX,
//         e.clientY,
//         canvasRef.current
//       );

//       const prevPosition = prevPointRef.current;

//       if (onSticker) {
//         onSticker({ ctx, newEmojiPosition, prevPosition, props });
//         setPositions((prevPositions) => [
//           ...prevPositions,
//           newEmojiPosition,
//         ]);
//       }

//       if (channel) {
//         const emojiData = {
//           type: "emoji",
//           emoji: selectedEmoji,
//           position: {
//             x: (newEmojiPosition.x / props.canvasWidth) * 100,
//             y: (newEmojiPosition.y / props.canvasHeight) * 100,
//           },
//         };

//         pushMessage(JSON.stringify(emojiData), channel);
//         setSelectedEmoji(null);
//       }

//       prevPointRef.current = newEmojiPosition;
//     }

//     handleClickRef.current = handleClick;

//     window.addEventListener("click", handleClickRef.current);

//     return () => {
//       window.removeEventListener("click", handleClickRef.current);
//     };
//   }, [emoji, onSticker, channel, otherProps, setCanvasCtx, selectedEmoji]);

//   useEffect(() => {
//     if (emoji) {
//       window.addEventListener("click", handleClickRef.current);
//     } else {
//       window.removeEventListener("click", handleClickRef.current);
//     }

//     return () => {
//       window.removeEventListener("click", handleClickRef.current);
//     };
//   }, [emoji]);

//   function setStickerCanvasRef(ref) {
//     if (!ref) return;
//     canvasRef.current = ref;
//   }

//   useEffect(() => {
//     console.log("New Emoji Position:", positions);
//   }, [positions]);

//   return {
//     positions,
//     toggleEmoji,
//     setStickerCanvasRef,
//     selectedEmoji,
//     setSelectedEmoji,
//   };
// }


import { useEffect, useRef, useState } from "react";
import { clearCanvas, computePointInCanvas, onSticker } from "../utils";

export function useSticker(
    pushMessage,
    channel,
    setCanvasCtx,
    otherProps
) {
    const [positions, setPositions] = useState([]);
    const [selectedEmoji, setSelectedEmoji] = useState("😊");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to track if the button is enabled

    const canvasRef = useRef(null);
    const prevPointRef = useRef();

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        const { parentCanvasRef, ...props } = otherProps;
        parentCanvasRef.current = canvasRef.current;
        setCanvasCtx(ctx);

        if (props.isCanvasClear) {
            clearCanvas(ctx, props.width, props.height);
        }
    }, [
        setCanvasCtx,
        otherProps.isCanvasClear,
    ]);

    function setStickerCanvasRef(ref) {
        if (!ref) return;
        canvasRef.current = ref;
    }

    function handleClick(e) {
        if (!canvasRef.current || !isButtonEnabled) return; // Paste only if button is enabled

        const ctx = canvasRef.current.getContext('2d');
        const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current); // Get cursor point

        onSticker({
            ctx,
            sticker: selectedEmoji,
            position: point,
            scale: 1, 
        });

        let prevPoint = prevPointRef.current;
        setPositions(positions => [
            ...positions,
            { ctx, point, prevPoint, sticker: selectedEmoji }
        ]);

        if (channel) {
            pushMessage(
                JSON.stringify({ point, sticker: selectedEmoji }),
                channel
            );
        }

        console.log("Position of useSticker after click:", positions);
    }

    return {
        setStickerCanvasRef,
        handleClick,
        setSelectedEmoji,    
        setIsButtonEnabled, 
    };
}
