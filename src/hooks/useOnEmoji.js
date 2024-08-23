import { useCallback, useEffect, useRef, useState } from "react";
import { clearCanvas, computePointInCanvas } from "../utils"; // Assume these utils are predefined

export function useOnEmoji(
    pushMessage,
    channel,
    setCanvasCtx,
    otherProps
) {
    const [emojis, setEmojis] = useState([]);

    const canvasRef = useRef(null);
    
    const setCanvasRef = useCallback((ref) => {
        if (!ref) return;
        canvasRef.current = ref;
    }, []);
    
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
         const { parentCanvasRef, ...props } = otherProps;
        // parentCanvasRef.current = canvasRef.current;
        // setCanvasCtx(ctx);

        if (props.isCanvasClear) {
            clearCanvas(ctx, props.width, props.height);
        }
    }, [
        channel,
        otherProps.isCanvasClear
    ]);

console.log('emojier', emojis);

const onMouseDown = useCallback((event) => {
    let emojiType = '😎';
    console.log('onMouseDown');
    const ctx = canvasRef.current?.getContext('2d');
    const { parentCanvasRef, ...props } = otherProps;
    parentCanvasRef.current = canvasRef.current;
    setCanvasCtx(ctx);

    const point = computePointInCanvas(event.clientX, event.clientY, canvasRef.current);
    console.log('pointonMouseDown', point);

    setEmojis((prevEmojis) => [...prevEmojis, { point, emoji: props.emojiType }]);

    // Draw the emoji on the canvas
    ctx.font = '24px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.clearRect(0, 0, ctx.width, ctx.height);
console.log('emojiesp', emojis, point)
    emojis.forEach(({ x, y }) => {
      ctx.fillText('😀', x, y);
    });

    ctx.fillText(emojiType || '😀', point.x, point.y); // Draw the latest emoji
    if (channel) {
        pushMessage(JSON.stringify({ point, emoji: props.emojiType }), channel);
    }
  }, [emojis?.length, channel]);

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
