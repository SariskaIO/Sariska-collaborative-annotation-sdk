// import { useEffect, useState } from "react";

// export function useSticker(pushMessage, channel) {
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [emojiPositions, setEmojiPositions] = useState([]);
//   const [isEmojiEnabled, setIsEmojiEnabled] = useState(false);

//   const onHandleClick = () => {
//     if (isEmojiEnabled) {
//       disableEmoji();
//     } else {
//       enableEmoji();
//     }
//     setIsEmojiEnabled(prevState => !prevState);
//   };

//   useEffect(() => {

//     function computePointInCanvas(clientX, clientY) {
//       const boundingRect = document.documentElement.getBoundingClientRect();
//       return {
//         x: clientX - boundingRect.left,
//         y: clientY - boundingRect.top
//       };
//     }

//     function handleScreenClick(e) {
//       if (showEmoji) {
//         const point = computePointInCanvas(e.clientX, e.clientY);
//         setEmojiPositions((prevPositions) => [...prevPositions, point]);
//         pushMessage(JSON.stringify({ type: 'emoji', point }), channel);
//       }
//     }

//     if (showEmoji) {
//       window.addEventListener('click', handleScreenClick);
//     }

//     return () => {
//       window.removeEventListener('click', handleScreenClick);
//     };
//   }, [showEmoji, pushMessage, channel]);

//   function enableEmoji() {
//     setShowEmoji(true);
//   }

//   function disableEmoji() {
//     setShowEmoji(false);
//   }

//   return {
//     enableEmoji,
//     disableEmoji,
//     onHandleClick,
//     emojiPositions
//   };
// }

import { useEffect, useRef, useState } from "react";
import { onSticker, computePointInCanvas, clearCanvas } from "../utils";

export function useSticker(pushMessage, channel) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiPositions, setEmojiPositions] = useState([]);
  const [isEmojiEnabled, setIsEmojiEnabled] = useState(false);
  const selectedEmojiRef = useRef(null);
  const canvasRef = useRef(null);

  const onHandleClick = () => {
    if (isEmojiEnabled) {
      disableEmoji();
    } else {
      enableEmoji();
    }
    setIsEmojiEnabled((prevState) => !prevState);
  };

  const selectEmoji = (emoji) => {
    selectedEmojiRef.current = emoji;
    enableEmoji();
  };

  useEffect(() => {
    function handleScreenClick(e) {
      if (showEmoji && selectedEmojiRef.current) {
        const point = computePointInCanvas(e.clientX, e.clientY);
        const ctx = canvasRef.current.getContext("2d");

        const newEmoji = {
          emoji: selectedEmojiRef.current,
          position: point,
        };
        if (onSticker) {
          onSticker({
            ctx,
            point,
            emoji: selectedEmojiRef.current,
            props: { emojiSize: 40 },
          });
          setEmojiPositions((prevPositions) => [...prevPositions, newEmoji]);
        }
        if (channel) {
          pushMessage(JSON.stringify({ type: "emoji", ...newEmoji }), channel);
        }
      }
    }

    if (showEmoji) {
      window.addEventListener("click", handleScreenClick);
    }

    if(props.isCanvasClear){
      clearCanvas( ctx, props.width, props.height );
  }

    return () => {
      window.removeEventListener("click", handleScreenClick);
    };
  }, [onSticker, showEmoji, isCanvasClear, pushMessage, channel]);

  function enableEmoji() {
    setShowEmoji(true);
  }

  function disableEmoji() {
    setShowEmoji(false);
  }

  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
  }

  return {
    enableEmoji,
    disableEmoji,
    onHandleClick,
    selectEmoji,
    emojiPositions,
    setCanvasRef,
  };
}
