import { useEffect, useRef } from "react";
import { onDraw } from "../utils";

export function useOnDraw(
    pushMessage,
    channel,
    setCanvasCtx,
    otherProps
    ){
    const canvasRef = useRef(null);
    const prevPointRef = useRef()
    const isDrawingRef = useRef(false);

    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    function clearCanvas(ctx, width, height){
        ctx.clearRect(0, 0, width, height)
    }

    useEffect(()=>{
        const ctx = canvasRef.current.getContext('2d');
        setCanvasCtx(ctx);
        function computePointInCanvas(clientX, clientY){
            if(canvasRef.current){
                const boundingRect = canvasRef.current.getBoundingClientRect();
                return {
                    x: clientX - boundingRect.left,
                    y: clientY - boundingRect.top
                }
            }else{
                return null;
            }
        }
        function initMouseMoveListener(){
            const mouseMoveListener = (e) => {
                if(isDrawingRef.current){
                    const point = computePointInCanvas(e.clientX, e.clientY);
                    let prevPoint = prevPointRef.current;
                    if(onDraw) onDraw({ctx, point, prevPoint, otherProps});
                    pushMessage(JSON.stringify({ctx, point, prevPoint, otherProps}), channel);
                    prevPointRef.current = point;
                }
            }
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener("mousemove", mouseMoveListener);
        }
        function initMouseUpListener(){
            const mouseUpListener=()=>{
                isDrawingRef.current = false;
                prevPointRef.current = null;
            }
            mouseUpListenerRef.current = mouseUpListener;
            window.addEventListener('mouseup', mouseUpListener);
        }
        function removeMouseEventListeners(){
            if(mouseMoveListenerRef.current){
                window.removeEventListener('mousemove', mouseMoveListenerRef.current);
            }
            if(mouseUpListenerRef.current){
                window.removeEventListener('mouseup', mouseUpListenerRef.current);
            }
        }

        if(otherProps.isParticipantAccess){
            initMouseMoveListener();
            initMouseUpListener();
        }else{
            if(otherProps.isModerator){
                initMouseMoveListener();
                initMouseUpListener();
            }
        }
        
        if(otherProps.isCanvasClear){
            clearCanvas( ctx.clearRect(0, 0, otherProps.width, otherProps.height))
        }

        return ()=>{
            if(otherProps.isParticipantAccess){
                removeMouseEventListeners();
            }else{
                if(otherProps.isModerator){
                    removeMouseEventListeners();
                }
        }
    },[
        onDraw, 
        channel,
        otherProps.isCanvasClear
    ]});

    function setCanvasRef(ref){
        if(!ref) return;
        canvasRef.current = ref;
    }
    
    function onMouseDown(){
        if(!canvasRef.current) return;
        isDrawingRef.current = true;
    }
    
    return {
        setCanvasRef,
        onMouseDown
    };
}