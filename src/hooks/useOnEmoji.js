import { useCallback, useEffect, useRef, useState } from "react";
import { clearCanvas, computePointInCanvas, onDrawEmoji, redrawAnnotations } from "../utils"; // Assume these utils are predefined
import { ANNOTATION_TOOLS } from "../constants";

export function useOnEmoji(
    pushMessage,
    channel,
    setCanvasCtx,
    annotations,
    setAnnotations,
    otherProps
) {
    const [emojis, setEmojis] = useState([]);

    const canvasRef = useRef(null);
    
    const setCanvasRef = useCallback((ref) => {
        if(otherProps.annotationTool !== ANNOTATION_TOOLS.emoji){
            return;
        }
        if (!ref) return;
        canvasRef.current = ref;
    }, []);
    
    useEffect(() => {
        console.log('stuseeffect', otherProps);
        if(otherProps.annotationTool !== ANNOTATION_TOOLS.emoji){
            return;
        }
        console.log('midstuseeffect');
        const canvas = canvasRef?.current;

        console.log('afuseeffectcavn', canvas);
        if(canvas){
            console.log('inuseeffectcavn', canvas);
            const ctx = canvas.getContext('2d');
            const { parentCanvasRef, isCanvasClear, width, height } = otherProps;
            parentCanvasRef.current = canvas;
            setCanvasCtx(prevCtx => {
                if (prevCtx !== ctx) {
                    return ctx;
                }
                return prevCtx;
            });
            if (annotations?.length !== 0) {
                setAnnotations([...annotations]);
            }

            console.log('emoji ctx', otherProps)
            if (isCanvasClear) {
                clearCanvas(ctx, width, height);
            }
        }
    }, [
        canvasRef,
        channel,
        otherProps,
      //  isCanvasClear
        setCanvasCtx,
        annotations?.length
    ]);

const onMouseDown = useCallback((event) => {
    console.log('stonMouseDown', otherProps)
    if(otherProps.annotationTool !== ANNOTATION_TOOLS.emoji){
        return;
    }
    console.log('midonMouseDown', otherProps)
    if(!otherProps.isModerator){
        return ;
    }
    console.log('afonMouseDown', otherProps)
    const ctx = canvasRef?.current?.getContext('2d');
    const { parentCanvasRef, ...props } = otherProps;

    const point = computePointInCanvas(event.clientX, event.clientY, canvasRef?.current);

    setEmojis((prevEmojis) => [...prevEmojis, { ctx, point, emoji: props.emojiType }]);
    setAnnotations((annotations) => [...annotations, { type: 'emoji', ctx, point, emoji: props.emojiType,
                                     emojis:  [...emojis, { ctx, point, emoji: props.emojiType }]}]);

    // Draw the emoji on the canvas
    // ctx.font = '24px Arial';
    // ctx.textBaseline = 'middle';
    // ctx.textAlign = 'center';
    // ctx.clearRect(0, 0, ctx.width, ctx.height);
    // emojis.forEach(({ x, y }) => {
    //   ctx.fillText(props.emojiType || '😀', x, y);
    // });

    // ctx.fillText(props.emojiType || '😀', point.x, point.y); // Draw the latest emoji
    console.log('onmousedown emoji', ctx, props)
    redrawAnnotations({ctx, annotations, props});
    onDrawEmoji({ctx, point, emoji: props.emojiType})
    if (channel) {
        pushMessage(JSON.stringify({ ctx, point, emoji: props.emojiType }), channel);
    }
  }, [emojis?.length, channel, otherProps, setEmojis, setAnnotations]);

    // function onMouseDown(e) {
    //     if (!canvasRef.current) return;
    //     console.log('onMouseDown')
    //     const { parentCanvasRef, ...props } = otherProps;
    //     const ctx = canvasRef.current.getContext('2d');
    //     const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);

    //     // Add emoji to state
    //     setEmojis((prevEmojis) => [...prevEmojis, { point, emoji: props.emojiType }]);

    //     // Draw the emoji on the canvas
    //     ctx.font = '24px Arial';
    //     ctx.textBaseline = 'middle';
    //     ctx.textAlign = 'center';
    //     ctx.fillText(props.emojiType || '😀', point.x, point.y);

    //     // Push the emoji placement to the channel
    //     if (channel) {
    //         pushMessage(JSON.stringify({ point, emoji: props.emojiType }), channel);
    //     }
    // }

    return {
        setCanvasRef,
        onMouseDown
    };
}
