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

        function computePointInCanvas(clientX, clientY) {
            if (canvasRef.current) {
                const boundingRect = canvasRef.current.getBoundingClientRect();
                return {
                    x: clientX - boundingRect.left,
                    y: clientY - boundingRect.top,
                };
            } else {
                return null;
            }
        }

        function initMouseMoveListener() {
            const mouseMoveListener = (e) => {
                if (isDrawingRef.current) {
                    const point = computePointInCanvas(e.clientX, e.clientY);
                    const prevPoint = prevPointRef.current;
                    if (onDrawCircle) onDrawCircle({ ctx, point, prevPoint, otherProps });
                    pushMessage(JSON.stringify({ ctx, point, prevPoint, otherProps }), channel);
                    prevPointRef.current = point;
                }
            };
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener('mousemove', mouseMoveListener);
        }

        function initMouseUpListener() {
            const mouseUpListener = () => {
                isDrawingRef.current = false;
                prevPointRef.current = null;
            };
            mouseUpListenerRef.current = mouseUpListener;
            window.addEventListener('mouseup', mouseUpListener);
        }

        function removeMouseEventListeners() {
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
        if (!canvasRef.current) return;
        isDrawingRef.current = true;
        const ctx = canvasRef.current.getContext('2d');
        const point = computePointInCanvas(e.clientX, e.clientY);
        const prevPoint = prevPointRef.current;
        prevPointRef.current = point; // Initialize the previous point with the current point
        if (onDrawCircle) onDrawCircle({ ctx, point, prevPoint, otherProps });
    }

    return {
        setCanvasRef,
        onMouseDown,
    };
}