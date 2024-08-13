// import { useEffect, useRef, useState } from "react";
// import { clearCanvas, computePointInCanvas, onEmojiPlace } from "../utils";
// export function useSticker(pushMessage, channel) {
//   const [selectedEmoji, setSelectedEmoji] = useState(null);
//   const emojiPositions = useRef([]); // Array to store emoji positions

//   const canvasRef = useRef(null);

//   const handleEmojiClick = (emoji) => {
//     setSelectedEmoji(emoji);
//   };

//   const onMouseDown = (e) => {
//     if (!canvasRef.current || !selectedEmoji) return;

//     const ctx = canvasRef.current.getContext('2d');
//     const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);

//     const newEmoji = {
//       emoji: selectedEmoji,
//       position: point,
//     };

//     const clearAllStickers = () => {
//       emojiPositions.current = [];
//       const ctx = canvasRef.current && canvasRef.current.getContext('2d');
//       if (ctx) {
//         clearCanvas(ctx, canvasRef.current.width, canvasRef.current.height);
//       }
//     };

//     onEmojiPlace({ ctx, point, emoji: selectedEmoji });

//     emojiPositions.current = [...emojiPositions.current, newEmoji];

//     if (channel) {
//       pushMessage(JSON.stringify({ type: "emoji", ...newEmoji }), channel);
//     }
//   };

//   useEffect(() => {
//     const ctx = canvasRef.current && canvasRef.current.getContext('2d');

//     if (props.isCanvasClear) {
//       clearCanvas(ctx, props.width, props.height);
//       emojiPositions.current = [];
//     }

//     return () => {};
//   }, [props.isCanvasClear, channel]);

//   return {
//     selectedEmoji,
//     setSelectedEmoji: handleEmojiClick, // Alias for readability
//     onMouseDown,
//     emojiPositions,
//     setCanvasRef: (ref) => { canvasRef.current = ref; },
//     clearAllStickers,
//   };
// }

import { useEffect, useRef, useState } from "react";
import { computePointInCanvas, onSticker } from "../utils";

export function useSticker(pushMessage, channel, setCanvasCtx, otherProps) {
  const [emoji, setEmoji] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const canvasRef = useRef(null);
  const prevPointRef = useRef();
  const isStickRef = useRef(false);
  const handleClickRef = useRef();

  const toggleEmoji = () => {
    if (!emoji) {
      setEmoji(true);
      handleClick();
    } else {
      setEmoji(false);
    }
  };

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
          setSelectedEmoji(null);
        }

        prevPointRef.current = newEmojiPosition;
      }
    }

    handleClickRef.current = initHandleClick;

    window.addEventListener("click", handleClickRef.current);

    return () => {
      window.removeEventListener("click", handleClickRef.current);
    };
  }, [emoji, onSticker, channel, otherProps, setCanvasCtx]);

  useEffect(() => {
    if (emoji) {
      window.addEventListener("click", handleClickRef.current);
    } else {
      window.removeEventListener("click", handleClickRef.current);
    }

    return () => {
      window.removeEventListener("click", handleClickRef.current);
    };
  }, [emoji]);

  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
  }

  function handleClick(e) {
    if (!canvasRef.current) return;

    isStickRef.current = true;
    const ctx = canvasRef.current.getContext("2d");
    const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);
    const prevPoint = prevPointRef.current || point;

    setPositions((prevPositions) => [
      ...prevPositions,
      { ctx, newEmojiPosition, prevPositions, props},
    ]);
    console.log("position in sdk",positions);
    prevPointRef.current = point;
  }

  return {
    positions,
    toggleEmoji,
    setCanvasRef,
    selectedEmoji,
    setSelectedEmoji,
  };
}
