// import { useEffect, useRef, useState } from "react";
// import { clearCanvas, computePointInCanvas, onEmojiPlace } from "../utils";

import { useEffect, useRef, useState } from "react";
import { computePointInCanvas, onSticker } from "../utils";

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

export function useSticker(pushMessage, channel, setCanvasCtx, otherProps) {
  const [emoji, setEmoji] = useState(false);
  const [positions, setPositions] = useState([]);
  const[selectedEmoji,setSelectedEmoji]=useState(false);
  const canvasRef = useRef(null);
  const prevPointRef = useRef();
  const isStickRef = useRef(false);
  const handleClickRef = useRef();

  const toggleEmoji = () => {
    setEmoji((prev) => !prev);
  };

  useEffect(() => {
    const ctx = canvasRef.current && canvasRef.current.getContext("2d");
    const { parentCanvasRef, ...props } = otherProps;
    parentCanvasRef.current = canvasRef.current;
    setCanvasCtx(ctx);

    function initHandleClick() {
      const handleEmojiClick = (e) => {
        if (emoji) {
          if (isStickRef.current) {
            const newEmojiPosition = computePointInCanvas(
              e.clientX,
              e.clientY,
              canvasRef.current
            );
            let prevPosition = prevPointRef.current;
            if (onSticker) {
              onSticker({ ctx, newEmojiPosition, prevPosition, props });
            }
            if (channel) {
              pushMessage(
                JSON.stringify({ ctx, newEmojiPosition, prevPosition, props }),
                channel
              );
            }
            prevPointRef.current = point;
          }
        }
      };
      handleClickRef.current = handleEmojiClick;
    }
  }, [onSticker, channel, otherProps.isCanvasClear]);

  useEffect(() => {
    if (emoji) {
      window.addEventListener("handleClick", handleEmojiClick);
    } else {
      window.removeEventListener("handleClick", handleEmojiClick);
    }
    return () => {
      document.removeEventListener("handleClick", handleEmojiClick);
    };
  }, [emoji]);

  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
  }

  function Click(e) {
    if (!canvasRef.current) return;
    const { parentCanvasRef, ...props } = otherProps;
    isStickRef.current = true;
    const ctx = canvasRef.current.getContext("2d");
    const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);
    const prevPoint = prevPointRef.current || point;
    setPositions((positions) => [
      ...positions,
      { ctx, newEmojiPosition, prevPosition, props },
    ]);
  }

  return {
    positions,
    toggleEmoji
  };
}
