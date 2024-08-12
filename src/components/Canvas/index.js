import React from 'react';
import { useState, useRef} from 'react';
import { useOnDraw } from '../../hooks/useOnDraw';
import { useSticker } from '../../hooks/useSticker';

const Canvas = ({
    width, 
    height, 
    pushMessage,
    channel,
    setCanvasCtx,
    inputProps,
    canvasRef,
    selectedEmoji,
    setSelectedEmoji,
    onStickerMouseDown,
    // emojiPositions

  }) => {
    const {children, ...otherProps} = inputProps;

//     

const { setCanvasRef: setDrawCanvasRef, onMouseDown: onDrawMouseDown, onMouseMove: onDrawMouseMove, onMouseUp: onDrawMouseUp } = useOnDraw(
  pushMessage,
  channel,
  setCanvasCtx,
  otherProps
);

const { handleStickerMouseDown, handleStickerMouseMove, handleStickerMouseUp, emojiPositions } = useSticker(
  pushMessage,
  channel
);

const canvasStyle = {
  position: 'absolute',
  zIndex: otherProps.zIndex,
  background: 'none'
};

const handleMouseDown = (e) => {
  if (mode === 'draw') {
    onDrawMouseDown(e);
  } else if (mode === 'sticker') {
    handleStickerMouseDown(e);
  }
};

const handleMouseMove = (e) => {
  if (mode === 'draw') {
    onDrawMouseMove(e);
  } else if (mode === 'sticker') {
    handleStickerMouseMove(e);
  }
};

const handleMouseUp = (e) => {
  if (mode === 'draw') {
    onDrawMouseUp(e);
  } else if (mode === 'sticker') {
    handleStickerMouseUp(e);
  }
};

// Render stickers based on emojiPositions
const renderStickers = () => {
  const ctx = canvasRef.current.getContext('2d');
  emojiPositions.forEach((emoji) => {
    // Draw the sticker using emoji data
    // Example:
    const img = new Image();
    img.src = emoji.imageUrl; // Replace with your emoji image source
    img.onload = () => {
      ctx.drawImage(img, emoji.position.x, emoji.position.y, emoji.width, emoji.height);
    };
  });
};

useEffect(() => {
  renderStickers();
}, [emojiPositions]);

return (
  <>
    <canvas
      width={width}
      height={height}
      style={canvasStyle}
      ref={setDrawCanvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
    {children}
    {/* Render stickers here or in a separate layer */}
  </>
);
};

export default Canvas;
