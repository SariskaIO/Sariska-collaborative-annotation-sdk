import { useCallback, useEffect, useRef, useState } from "react";
import { computePointInCanvas, onSticker } from "../utils";

export function useSticker(pushMessage, channel, setCanvasCtx, otherProps) {
  const [emoji, setEmoji] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState("😊");

  const canvasRef = useRef(null);
  const prevPointRef = useRef();
  const isStickRef = useRef(false);

  const toggleEmoji = () => {
    // setEmoji((prev) => !prev);
       setEmoji(prev => !prev);

  };

  const handleClick = useCallback((e) => {
    const ctx = canvasRef.current?canvasRef.current.getContext("2d"):null;
const { parentCanvasRef, ...props } = otherProps;

    if (ctx) {
      parentCanvasRef.current = canvasRef.current;
      setCanvasCtx(ctx);
    }

    // if (!emoji && canvasRef.current && e.target === canvasRef.current) {
      if (!emoji) {
      const newEmojiPosition = computePointInCanvas(
        e.clientX,
        e.clientY,
        canvasRef.current
      );
      console.log("Computed emoji position:", newEmojiPosition);

      isStickRef.current = true;

      const stickerData = {
        ctx,
        sticker: selectedEmoji,
        position: newEmojiPosition,
        scale: 1,
      };

      if (onSticker) {
        onSticker(stickerData);
        setPositions((prevPositions) => [
          ...prevPositions,
          newEmojiPosition,
        ]);
      }

      if (channel) {
        const emojiData = {
          type: "emoji",
          emoji: selectedEmoji,
          position: {
            x: (newEmojiPosition.x / props.canvasWidth) * 100,
            y: (newEmojiPosition.y / props.canvasHeight) * 100,
          },
        };

        pushMessage(JSON.stringify(emojiData), channel);
        setEmoji(false);
      }

      prevPointRef.current = newEmojiPosition;
    }
  }, [emoji, selectedEmoji, otherProps.isCanvasClear, onSticker, channel, setCanvasCtx]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener("click", handleClick);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("click", handleClick);
      }
    };
  }, [handleClick]);

  if(props.isCanvasClear){
    clearCanvas( ctx, props.width, props.height );
}

  useEffect(() => {
    if (!emoji) {
      window.addEventListener("click", handleClick);
    } else {
      window.removeEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [emoji, handleClick]);

  const setStickerCanvasRef = useCallback((ref) => {
    if (!ref) return;
    canvasRef.current = ref;
  }, []);

  useEffect(() => {
    console.log("New Emoji Position:", positions);
  }, [positions]);

  return {
    positions,
    toggleEmoji,
    handleClick,
    setStickerCanvasRef,
    selectedEmoji,
    setSelectedEmoji,
  };
}


// import { useCallback, useEffect, useRef, useState } from "react";
// import { computePointInCanvas, onSticker } from "../utils";

// export function useSticker(
//   pushMessage, 
//   channel,
//   setCanvasCtx,
//   otherProps
// ) {
//   const [emoji, setEmoji] = useState(false);
//   const [positions, setPositions] = useState([]);
//   const [selectedEmoji, setSelectedEmoji] = useState("😊");

//   const canvasRef = useRef(null);
//   const prevPointRef = useRef();
//   const isStickRef = useRef(false);

//   const toggleEmoji = () => {
//     if(!emoji){
//       setEmoji(true);
//     }else{
//       setEmoji(false);
//     }
//   };

//   useEffect(() => {
//     const ctx = canvasRef.current?canvasRef.current.getContext("2d"):null;
//     const { parentCanvasRef, ...props } = otherProps;

//     if (ctx) {
//       parentCanvasRef.current = canvasRef.current;
//       setCanvasCtx(ctx);
//     }

//     function handleClick(e) {
//       console.log("Canvas click detected:", e); // Log the click event

//       if (emoji || !canvasRef.current) return;
//       // if (!emoji) {
//       const newEmojiPosition = computePointInCanvas(
//         e.clientX,
//         e.clientY,
//         canvasRef.current
//       );

//       console.log("Computed emoji position:", newEmojiPosition); // Log the computed position


//       if (e.target === canvasRef.current) {
//         isStickRef.current = true;

//         const stickerData = {
//           ctx,
//           sticker: selectedEmoji,
//           position: newEmojiPosition,
//           scale: 1,
//         };

//         if (onSticker) {
//           onSticker(stickerData);

//           setPositions((prevPositions) => [
//             ...prevPositions,
//             newEmojiPosition,
//           ]);
//         }

//         if (channel) {
//           const emojiData = {
//             type: "emoji",
//             emoji: selectedEmoji,
//             position: {
//               x: (newEmojiPosition.x / props.canvasWidth) * 100,
//               y: (newEmojiPosition.y / props.canvasHeight) * 100,
//             },
//           };

//           pushMessage(JSON.stringify(emojiData), channel);
//           setEmoji(false);
//         }

//         prevPointRef.current = newEmojiPosition;
//       }
    
//     }

//     if (canvasRef.current) {
//       canvasRef.current.addEventListener("click", handleClick);
//     }

//     return () => {
//       if (canvasRef.current) {
//         canvasRef.current.removeEventListener("click", handleClick);
//       }
//     };
//   }, [emoji, onSticker, channel, otherProps, setCanvasCtx, selectedEmoji]);

//   useEffect(() => {
//     if (!emoji) {
//       document.addEventListener('click', handleClick);
//     } else {
//       document.removeEventListener('click', handleClick);
//     }

//     return () => {
//       document.removeEventListener('click', handleClick);
//     };
//   }, [!emoji]);

//   const setStickerCanvasRef = useCallback((ref) => {
//     if (!ref) return;
//     canvasRef.current = ref;
//   }, []);

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

