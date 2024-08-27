import React, { useRef, useEffect, useState } from 'react';
import { calculateCircleRadius, clearCanvas, computePointInCanvas, onDrawCircle, redrawCircles } from "../utils";

export function useOnCircle(pushMessage, channel, setCanvasCtx, annotations, otherProps) {
    const canvasRef = useRef(null);
    const startPointRef = useRef(null);
    const isDrawingRef = useRef(false);
    const [circles, setCircles] = useState([]);

    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);
console.log('first circles', circles, annotations);
    useEffect(() => {
        const ctx = canvasRef?.current?.getContext('2d');
        const { parentCanvasRef, ...props } = otherProps;
        parentCanvasRef.current = canvasRef?.current;
        setCanvasCtx(ctx);

        function initMouseMoveListener() {
            console.log('initMouseMoveListener');
            const mouseMoveListener = (e) => {
                console.log('mouseMoveListener e is', e);
                if (isDrawingRef.current) {
                    const currentPoint = computePointInCanvas(e.clientX, e.clientY, canvasRef?.current);
                    const startPoint = startPointRef.current;
                    const radius = calculateCircleRadius(startPoint, currentPoint);
                    redrawCircles({ctx, circles, annotations, props});
                    onDrawCircle({ ctx, center: startPoint, radius, props});
                    console.log('onDrawCircle before', ctx, currentPoint, startPoint, props);
                }
            };
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener('mousemove', mouseMoveListener);
        }

        function initMouseUpListener() {
            console.log('initMouseUpListener');
            const mouseUpListener = (event) => {
                if (isDrawingRef.current) {
                    const currentPoint = computePointInCanvas(event.clientX, event.clientY, canvasRef?.current);
                    const startPoint = startPointRef.current;
                    const radius = calculateCircleRadius(startPoint, currentPoint);
                    setCircles([...circles, { center: startPoint, radius }]);
                    pushMessage(JSON.stringify({ ctx, center: startPoint, radius, props }), channel);
                    isDrawingRef.current = false;
                    startPointRef.current = null;

                }
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
        circles,
        otherProps.isCanvasClear,
        otherProps.isImageSaved,
        otherProps.lineColor,
        otherProps
    ]);

    function setCanvasRef(ref) {
        if (!ref) return;
        canvasRef.current = ref;
    }

    function onMouseDown(e) {
        console.log('onMouseDown', e);
        if (!canvasRef?.current) return;
        console.log('in canvasRef.current')
        isDrawingRef.current = true;
        const ctx = canvasRef?.current.getContext('2d');
        const point = computePointInCanvas(e.clientX, e.clientY, canvasRef?.current);
        const startPoint = startPointRef.current;
        startPointRef.current = point; // Initialize the previous point with the current point
       // onDrawCircle({ ctx, point, startPoint, otherProps });
    }

    return {
        setCanvasRef,
        onMouseDown,
    };
}