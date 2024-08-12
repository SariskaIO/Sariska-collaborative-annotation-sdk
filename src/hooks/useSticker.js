


import { useEffect, useRef, useState } from "react";
import { clearCanvas, computePointInCanvas, onEmojiPlace } from "../utils";

export function useSticker(pushMessage, channel) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const emojiPositions = useRef([]); // Array to store emoji positions

  const canvasRef = useRef(null);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const onMouseDown = (e) => {
    if (!canvasRef.current || !selectedEmoji) return;

    const ctx = canvasRef.current.getContext('2d');
    const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);

    const newEmoji = {
      emoji: selectedEmoji,
      position: point,
    };

    const clearAllStickers = () => {
      emojiPositions.current = [];
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        clearCanvas(ctx, canvasRef.current.width, canvasRef.current.height);
      }
    };

    onEmojiPlace({ ctx, point, emoji: selectedEmoji });

    emojiPositions.current = [...emojiPositions.current, newEmoji];

    if (channel) {
      pushMessage(JSON.stringify({ type: "emoji", ...newEmoji }), channel);
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (props.isCanvasClear) {
      clearCanvas(ctx, props.width, props.height);
      emojiPositions.current = []; 
    }

    return () => {};
  }, [props.isCanvasClear, channel]);

  return {
    selectedEmoji,
    setSelectedEmoji: handleEmojiClick, // Alias for readability
    onMouseDown,
    emojiPositions,
    setCanvasRef: (ref) => { canvasRef.current = ref; },
    clearAllStickers,
  };
}
