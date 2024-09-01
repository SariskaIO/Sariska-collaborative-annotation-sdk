import React, { useState } from 'react';
import { useOnDraw } from '../../hooks/useOnDraw';
 import { ANNOTATION_TOOLS } from '../../constants';
 import { useOnEmoji } from '../../hooks/useOnEmoji';
 import { useOnCircle } from '../../hooks/useOnCircle';
import { useOnTextBox } from '../../hooks/useOnTextBox';

const Canvas = ({
    width, 
    height, 
    pushMessage,
    channel,
    setCanvasCtx,
    inputProps,
    remoteTextboxes
  }) => {
    const {children, ...otherProps} = inputProps;
    const [annotations, setAnnotations] = useState([]);
    const emojiHook = useOnEmoji(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
    const circleHook = useOnCircle(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
    const textboxHook = useOnTextBox(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
    const drawHook = useOnDraw(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
    console.log('annotaiotnsa', annotations, inputProps);
  // Use logic to select the correct hook result
  const { setCanvasRef, onMouseDown, handleTextChange, textboxes } = 
  inputProps.annotationTool === ANNOTATION_TOOLS.emoji ? emojiHook : 
  inputProps.annotationTool === ANNOTATION_TOOLS.circle ? circleHook :
  inputProps.annotationTool === ANNOTATION_TOOLS.textbox ? textboxHook : 
  drawHook;
  
    const canvasStyle={
      position: 'absolute', 
      zIndex: otherProps.zIndex,
      background: 'none'
    }
  let textboxList = textboxes?.length ? textboxes : remoteTextboxes?.length ? remoteTextboxes : [];
  
  return (
        <>
        <canvas 
            width={width}
            height={height}
            style={canvasStyle}
            ref={setCanvasRef}
            onMouseDown={onMouseDown}
        />
        {textboxList?.length ? textboxList?.map((textbox) => (
                <textarea
                    key={textbox.id}
                    style={{
                        position: 'absolute',
                        top: textbox.y + 'px',
                        left: textbox.x + 'px',
                        width: textbox.width + 'px',
                        height: textbox.height + 'px',
                        resize: 'none',
                        overflow: 'hidden',
                        boxSizing: 'border-box',
                        maxWidth: `${Math.min(200, 600 - textbox.x)}px`,
                        maxHeight: `${Math.min(96, 500 - textbox.y)}px`,
                        zIndex: otherProps.zIndex,
                    }}
                    value={textbox.text}
                    onChange={(e) => handleTextChange(e, textbox.id)}
                    autoFocus
                />
            )) : null}
          {children}
        </>
  )
}

export default Canvas

