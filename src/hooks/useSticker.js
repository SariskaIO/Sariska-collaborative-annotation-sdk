
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
//     if (!emoji) {
//       setEmoji(true);
//       handleClick();
//     } else {
//       setEmoji(false);
//     }
//   };

//   useEffect(() => {
//     const ctx = canvasRef.current && canvasRef.current.getContext("2d");
//     const { parentCanvasRef, ...props } = otherProps;

//     if (ctx) {
//       parentCanvasRef.current = canvasRef.current;
//       setCanvasCtx(ctx);
//     }

//     function initHandleClick(e) {
//       if (emoji && isStickRef.current) {
//         const newEmojiPosition = computePointInCanvas(
//           e.clientX,
//           e.clientY,
//           canvasRef.current
//         );

//         const prevPosition = prevPointRef.current;

//         if (onSticker) {
//           onSticker({ ctx, newEmojiPosition, prevPosition, props });
//           setPositions((prevPositions) => [
//             ...prevPositions,
//             newEmojiPosition
//             // { ctx, newEmojiPosition, prevPositions, props},
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
//           setSelectedEmoji(null);
//         }

//         prevPointRef.current = newEmojiPosition;
//       }
//     }

//     handleClickRef.current = initHandleClick;

//     window.addEventListener("click", handleClickRef.current);

//     return () => {
//       window.removeEventListener("click", handleClickRef.current);
//     };
//   }, [emoji, onSticker, channel, otherProps, setCanvasCtx]);

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

//   function setCanvasRef(ref) {
//     if (!ref) return;
//     canvasRef.current = ref;
//   }

//   function handleClick(e) {
//     if (!canvasRef.current) return;

//     isStickRef.current = true;
//     const ctx = canvasRef.current.getContext("2d");
//     const newEmojiPosition = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);
//     const prevPoint = prevPointRef.current || newEmojiPosition;

//     setPositions((prevPositions) => [
//       ...prevPositions,
//       newEmojiPosition
//       // { ctx, newEmojiPosition, prevPositions, props},
//     ]);

//     prevPointRef.current = newEmojiPosition;
//   }

//   useEffect(() => {
//     console.log('New Emoji Position:', positions);
//   }, [positions]);
  
//   return {
//     positions,
//     toggleEmoji,
//     setCanvasRef,
//     selectedEmoji,
//     setSelectedEmoji,
//   };
// }

import { useEffect, useRef, useState } from "react";
import { computePointInCanvas, onSticker } from "../utils";

export function useSticker(pushMessage, channel, setCanvasCtx, otherProps) {
  const [emoji, setEmoji] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState("😊");
  const canvasRef = useRef(null);
  const prevPointRef = useRef();
  const isStickRef = useRef(false);
  const handleClickRef = useRef();

  const toggleEmoji = () => {
    setEmoji((prev) => !prev);
  };

  console.log("first positions created",positions);
  useEffect(() => {
    const ctx = canvasRef.current && canvasRef.current.getContext("2d");
    const { parentCanvasRef, ...props } = otherProps;

    if (ctx) {
      parentCanvasRef.current = canvasRef.current;
      setCanvasCtx(ctx);
    }

    function initHandleClick(e) {
      if (emoji && isStickRef.current) {
        const newEmojiPosition = computePointInCanvas(
          e.clientX,
          e.clientY,
          canvasRef.current
        );

        const prevPosition = prevPointRef.current;

        if (onSticker) {
          onSticker({ ctx, newEmojiPosition, prevPosition, props });
          setPositions((prevPositions) => [...prevPositions, newEmojiPosition]);
        }
        console.log("in inithandleclick",positions);


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
          setSelectedEmoji(null);
        }

        prevPointRef.current = newEmojiPosition;
      }
    }

    handleClickRef.current = initHandleClick;

    if (emoji) {
      window.addEventListener("click", initHandleClick);
    } else {
      window.removeEventListener("click", initHandleClick);
    }
    return () => {
      window.removeEventListener("click", initHandleClick);
    };
  }, [emoji, onSticker, channel, otherProps, setCanvasCtx, selectedEmoji]);

  // useEffect(() => {
  //   if (emoji) {
  //     window.addEventListener("click", initHandleClick);
  //   } else {
  //     window.removeEventListener("click", initHandleClick);
  //   }

  //   return () => {
  //     window.removeEventListener("click", handleClickRef.current);
  //   };
  // }, [emoji]);

  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
  }

  function handleClick(e) {
    if (!canvasRef.current) return;

    isStickRef.current = true;
    const ctx = canvasRef.current.getContext("2d");
    const newEmojiPosition = computePointInCanvas(
      e.clientX,
      e.clientY,
      canvasRef.current
    );
    const prevPoint = prevPointRef.current || newEmojiPosition;

    setPositions((prevPositions) => [...prevPositions, newEmojiPosition]);

    prevPointRef.current = newEmojiPosition;
  }

  useEffect(() => {
    console.log("New Emoji Position:", positions);
  }, [positions]);

  return {
    positions,
    toggleEmoji,
    setCanvasRef,
    selectedEmoji,
    handleClick,
  };
}

