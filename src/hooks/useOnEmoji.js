import { useEffect, useRef, useState } from "react";
import { clearCanvas, computePointInCanvas } from "../utils"; // Assume these utils are predefined

export function useOnEmoji(
    pushMessage,
    channel,
    setCanvasCtx,
    otherProps
) {
    const [emojis, setEmojis] = useState([]);

    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);

    const mouseUpListenerRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        const { parentCanvasRef, ...props } = otherProps;
        parentCanvasRef.current = canvasRef.current;
        setCanvasCtx(ctx);

        function initMouseUpListener() {
            const mouseUpListener = () => {
                isDrawingRef.current = false;
            };
            mouseUpListenerRef.current = mouseUpListener;
            window.addEventListener('mouseup', mouseUpListener);
        }

        function removeMouseEventListeners() {
            if (mouseUpListenerRef.current) {
                window.removeEventListener('mouseup', mouseUpListenerRef.current);
            }
        }

        if (props.isParticipantAccess || props.isModerator) {
            initMouseUpListener();
        }

        if (props.isCanvasClear) {
            clearCanvas(ctx, props.width, props.height);
        }

        return () => {
            if (props.isParticipantAccess || props.isModerator) {
                removeMouseEventListeners();
            }
        };
    }, [
        channel,
        otherProps.isCanvasClear,
        otherProps.emojiType
    ]);

    function setCanvasRef(ref) {
        if (!ref) return;
        canvasRef.current = ref;
    }

    function onMouseDown(e) {
        if (!canvasRef.current) return;
        const { parentCanvasRef, ...props } = otherProps;
        isDrawingRef.current = true;
        const ctx = canvasRef.current.getContext('2d');
        const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);

        // Add emoji to state
        setEmojis((prevEmojis) => [...prevEmojis, { point, emoji: props.emojiType }]);

        // Draw the emoji on the canvas
        ctx.font = '24px Arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(props.emojiType || '😀', point.x, point.y);

        // Push the emoji placement to the channel
        if (channel) {
            pushMessage(JSON.stringify({ point, emoji: props.emojiType }), channel);
        }
    }

    return {
        setCanvasRef,
        onMouseDown
    };
}
