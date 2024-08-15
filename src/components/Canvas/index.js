
// import React from "react";
// import { useOnDraw } from "../../hooks/useOnDraw";
// import { useSticker } from "../../hooks/useSticker";

// const Canvas = ({
//   width,
//   height,
//   pushMessage,
//   channel,
//   setCanvasCtx,
//   inputProps,
// }) => {
//   const { children, ...otherProps } = inputProps;
//   const { setCanvasRef, onMouseDown, setSelectedSticker } = useOnDraw(
//     pushMessage,
//     channel,
//     setCanvasCtx,
//     otherProps
//   );

//   const {
//     toggleEmoji,
//     positions,
//     setStickerCanvasRef,
//     selectedEmoji,
//     setSelectedEmoji,
//     onMouseClick,
//   } = useSticker(pushMessage, channel, setCanvasCtx, otherProps);

//   const ref = otherProps.useSticker ? setStickerCanvasRef : setCanvasRef;

//   const canvasStyle = {
//     position: "absolute",
//     zIndex: otherProps.zIndex,
//     background: "none",
//   };
//   return (
//     <>
//       <canvas
//         width={width}
//         height={height}
//         style={canvasStyle}
//         ref={setCanvasRef}
//         onMouseDown={otherProps.useSticker ? onMouseClick : onMouseDown} 
//         // onMouseDown={onMouseDown}
//       />
//       {children}
//     </>
//   );
// };

// export default Canvas;


import React from "react";
import { useSticker } from "../../hooks/useSticker";
import { useOnDraw } from "../../hooks/useOnDraw";

const Canvas = ({
  width,
  height,
  pushMessage,
  channel,
  setCanvasCtx,
  inputProps,
}) => {
  const { children, ...otherProps } = inputProps;

  const { setCanvasRef, onMouseDown, handleDraw} = useOnDraw(
        pushMessage,
        channel,
        setCanvasCtx,
        otherProps
      );
  
  // Use the useSticker hook
  const {
    toggleEmoji,
    positions,
    setStickerCanvasRef,
    selectedEmoji,
    setSelectedEmoji,
    handleClick,
    // onMouseClick,
  } = useSticker(pushMessage, channel, setCanvasCtx, otherProps);

  const ref = (ref) => {
    if (ref) {
      if (handleDraw) {
        setCanvasRef(ref);
      } else {
        setStickerCanvasRef(ref);
      }
    }
  };
  
  const canvasStyle = {
    position: "absolute",
    zIndex: otherProps.zIndex,
    background: "none",
  };

  return (
    <>
      <canvas
        width={width}
        height={height}
        style={canvasStyle}
        ref={ref}
        onMouseDown={onMouseDown} 
        onClick={handleClick}
      />
      {children}
    </>
  );
};

export default Canvas;
