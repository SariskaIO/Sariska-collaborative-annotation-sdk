
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
    const ctx = canvasRef.current.getContext('2d');
        const {parentCanvasRef, ...props} = otherProps;
        parentCanvasRef.current = canvasRef.current;
        setCanvasCtx(ctx);

    function handleScreenClick(e) {
      if (showEmoji && selectedEmojiRef.current) {
        const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);
        const prevPoint = prevPointRef.current;
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
        prevPointRef.current = point;
      }
    }

    if (showEmoji) {
      window.addEventListener("click", handleScreenClick);
    }
    return () => {
      window.removeEventListener("click", handleScreenClick);
    };
  }, [onSticker, otherProps.showEmoji, otherProps.isCanvasClear, channel]);

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

  if(props.isCanvasClear){
    clearCanvas( ctx, props.width, props.height );
    setEmojiPositions([]);
}

if(props.isParticipantAccess){
  handleScreenClick();
  enableEmoji();
  disableEmoji();
}else{
  if(props.isModerator){
    handleScreenClick();
    enableEmoji();
    disableEmoji();
  }
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


// import { useEffect, useRef, useState } from "react";
// import { clearCanvas, computePointInCanvas } from "../utils";

// export function useOnPasteSticker(pushMessage, channel, setCanvasCtx, otherProps) {
//     const [stickers, setStickers] = useState([]);

//     const canvasRef = useRef(null);
//     const isPastingRef = useRef(false);

//     const mouseClickListenerRef = useRef(null);

//     useEffect(() => {
//         const ctx = canvasRef.current.getContext('2d');
//         const { parentCanvasRef, ...props } = otherProps;
//         parentCanvasRef.current = canvasRef.current;
//         setCanvasCtx(ctx);

//         function initMouseClickListener() {
//             const mouseClickListener = (e) => {
//                 const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);
//                 const sticker = {
//                     src: props.selectedEmojiUrl, // The URL or image source of the selected emoji
//                     point,
//                     width: props.stickerWidth || 50, // Default width if not provided
//                     height: props.stickerHeight || 50, // Default height if not provided
//                 };

//                 setStickers(stickers => [...stickers, sticker]);

//                 // Draw the sticker on the canvas
//                 const img = new Image();
//                 img.src = sticker.src;
//                 img.onload = () => {
//                     ctx.drawImage(img, sticker.point.x, sticker.point.y, sticker.width, sticker.height);
//                 };

//                 // Send sticker data via channel if necessary
//                 if (channel) {
//                     pushMessage(JSON.stringify(sticker), channel);
//                 }
//             };

//             mouseClickListenerRef.current = mouseClickListener;
//             window.addEventListener("click", mouseClickListener);
//         }

//         function removeMouseClickListener() {
//             if (mouseClickListenerRef.current) {
//                 window.removeEventListener('click', mouseClickListenerRef.current);
//             }
//         }

//         if (props.isParticipantAccess || props.isModerator) {
//             initMouseClickListener();
//         }

//         if (props.isCanvasClear) {
//             clearCanvas(ctx, props.width, props.height);
//             setStickers([]); // Clear stickers
//         }

//         if (props.isImageSaved) {
//             props.saveImage(stickers);
//         }

//         return () => {
//             if (props.isParticipantAccess || props.isModerator) {
//                 removeMouseClickListener();
//             }
//         };
//     }, [
//         channel,
//         otherProps.isCanvasClear,
//         otherProps.isImageSaved,
//         otherProps.selectedEmojiUrl,
//     ]);

//     function setCanvasRef(ref) {
//         if (!ref) return;
//         canvasRef.current = ref;
//     }

//     return {
//         setCanvasRef,
//     };
// }
