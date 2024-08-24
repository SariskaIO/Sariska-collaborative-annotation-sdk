import React, { useRef, useEffect, useState } from 'react';
import { clearCanvas, computePointInCanvas, onDrawCircle } from "../utils";

export function useOnCircle(pushMessage, channel, setCanvasCtx, otherProps) {
    const canvasRef = useRef(null);
    const prevPointRef = useRef(null);
    const isDrawingRef = useRef(false);

    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        const { parentCanvasRef, ...props } = otherProps;
        parentCanvasRef.current = canvasRef.current;
        setCanvasCtx(ctx);

        function initMouseMoveListener() {
            console.log('initMouseMoveListener');
            const mouseMoveListener = (e) => {
                console.log('mouseMoveListener e is', e);
                if (isDrawingRef.current) {
                    const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);
                    const prevPoint = prevPointRef.current;
                    onDrawCircle({ ctx, point, prevPoint });
                    console.log('onDrawCircle before', ctx, point, prevPoint);
                    pushMessage(JSON.stringify({ ctx, point, prevPoint }), channel);
                    prevPointRef.current = point;
                }
            };
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener('mousemove', mouseMoveListener);
        }

        function initMouseUpListener() {
            console.log('initMouseUpListener');
            const mouseUpListener = () => {
                isDrawingRef.current = false;
                prevPointRef.current = null;
            };
            mouseUpListenerRef.current = mouseUpListener;
            window.addEventListener('mouseup', mouseUpListener);
        }

        function removeMouseEventListeners() {
            console.log('removeMouseEventListeners')
            if (mouseMoveListenerRef.current) {
                window.removeEventListener('mousemove', mouseMoveListenerRef.current);
            }
            if (mouseUpListenerRef.current) {
                window.removeEventListener('mouseup', mouseUpListenerRef.current);
            }
        }

        if (otherProps.isParticipantAccess || otherProps.isModerator) {
            initMouseMoveListener();
            initMouseUpListener();
        }

        if (otherProps.isCanvasClear) {
            clearCanvas(ctx, otherProps.width, otherProps.height);
        }

        return () => {
            removeMouseEventListeners();
        };
    }, [
        onDrawCircle,
        channel,
        otherProps.isCanvasClear,
        otherProps.isImageSaved,
        otherProps.lineColor,
        otherProps,
    ]);

    function setCanvasRef(ref) {
        if (!ref) return;
        canvasRef.current = ref;
    }

    function onMouseDown(e) {
        console.log('onMouseDown', e);
        if (!canvasRef.current) return;
        console.log('in canvasRef.current')
        isDrawingRef.current = true;
        const ctx = canvasRef.current.getContext('2d');
        const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);
        const prevPoint = prevPointRef.current;
        prevPointRef.current = point; // Initialize the previous point with the current point
        onDrawCircle({ ctx, point, prevPoint, otherProps });
    }

    return {
        setCanvasRef,
        onMouseDown,
    };
}