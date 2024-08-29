import { useState, useRef, useEffect } from 'react';
import { clearCanvas, redrawAnnotations } from '../utils';

export function useTextBoxHook(
    pushMessage,
    channel,
    setCanvasCtx,
    annotations,
    setAnnotations,
    otherProps) {
    const [textboxes, setTextboxes] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef?.current?.getContext('2d');
         const { parentCanvasRef, ...props } = otherProps;
        parentCanvasRef.current = canvasRef?.current;
        console.log('text ctx', ctx, canvasRef?.current)
        setCanvasCtx(ctx);
        setAnnotations([...annotations]);

        if (props.isCanvasClear) {
            clearCanvas(ctx, props.width, props.height);
        }
    }, [
        channel,
        otherProps.isCanvasClear,
        setCanvasCtx,
        otherProps,
        annotations?.length
    ]);


    const handleCanvasClick = (e) => {
        if(!otherProps.isModerator){
            return ;
        }
        const canvas = canvasRef?.current;
        const rect = canvas?.getBoundingClientRect();
        const ctx = canvasRef?.current?.getContext('2d');

        // Get click coordinates relative to the canvas
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newTextbox = {
            id: Date.now(),
            x: x,
            y: y,
            width: 200, // Max width or till the canvas's right end
            height: 32, // Min height
            text: ''
        };

        setTextboxes([...textboxes, newTextbox]);
        redrawAnnotations({ctx, annotations, otherProps});
        setAnnotations((annotations) => [...annotations, { type: 'textbox', ctx, textbox: newTextbox }])
    };

    const handleTextChange = (e, id) => {
        const newText = e.target.value;
        const ctx = canvasRef?.current?.getContext('2d');
        setTextboxes((prevTextboxes) =>
            prevTextboxes.map((textbox) => {
                if (textbox.id === id) {
                    const textMetrics = measureText(newText, textbox.width);
                    let newWidth = Math.min(200, canvasRef.current.width - textbox.x);
                    let newHeight = Math.max(textMetrics.height, 32);
                    newHeight = Math.min(newHeight, 96);
                    let newTextbox = {
                        ...textbox,
                        text: newText,
                        width: newWidth,
                        height: newHeight,
                    }
                    redrawAnnotations({ctx, annotations, otherProps});
                    setAnnotations(annotations => ([...annotations, {type: 'textbox', ctx, textbox: newTextbox }]))
                    return newTextbox;
                }
                redrawAnnotations({ctx, annotations, otherProps});
                setAnnotations(annotations => ([...annotations, {type: 'textbox', ctx, textbox}]))
                return textbox;
            })
        );
    };

    const measureText = (text, maxWidth) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '16px Arial';

        const words = text.split(' ');
        let line = '';
        let height = 32; // Start with min height
        let width = 0;

        words.forEach((word, index) => {
            let testLine = line + word;
            if (index < words.length - 1) {
                testLine += ' ';
            }
            const testWidth = context.measureText(testLine).width;

            if (testWidth > maxWidth && line.length > 0) {
                line = word + ' ';
                height += 16;
            } else {
                line = testLine;
            }

            width = Math.max(width, testWidth);
        });

        return {
            width: Math.min(width, maxWidth),
            height: height,
        };
    };

    function setCanvasRef(ref) {
        if (!ref) return;
        canvasRef.current = ref;
    }

    function onMouseDown(e) {
        handleCanvasClick(e);
    }

    return {
        setCanvasRef,
        onMouseDown,
        handleTextChange,
        textboxes
    };
}
