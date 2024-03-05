import { useEffect, useRef, useState } from "react";
import { clearCanvas, onDraw } from "../utils";

export function useOnDraw(
    pushMessage,
    channel,
    setCanvasCtx,
    otherProps
    ){

    const [annotations, setAnnotations] = useState([]);

    const canvasRef = useRef(null);
    const prevPointRef = useRef()
    const isDrawingRef = useRef(false);

    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    const saveImage = () => {
        const context = canvasRef.current.getContext('2d');
        const image = new Image();
        image.src = otherProps.imageUrl;
        image.onload = () => {
          // Draw the image onto the canvas
          context.drawImage(image, 0, 0, 800, 600);
    
          // Draw the annotations onto the canvas
          context.strokeStyle = otherProps?.lineColor;
          context.lineWidth = otherProps?.lineWidth;
          annotations.forEach((annotation, index) => {
            if (index === 0) {
              context.beginPath();
              context.moveTo(annotation.x, annotation.y);
            } else {
              context.lineTo(annotation.x, annotation.y);
              context.stroke();
            }
          });
    
          // Convert the canvas to an image and open it in a new tab
          const imageDataUrl = canvasRef.current.toDataURL('image/png');
          const newWindow = window.open('about:blank', 'image from canvas');
          newWindow.document.write('<img src="' + imageDataUrl + '" alt="Saved Annotation" />');
        };
        // const canvas = canvasRef.current;
        // const link = document.createElement('a');
        // link.download = 'image_with_drawing.png';
        // canvas.toBlob((blob) => {
        //   const url = URL.createObjectURL(blob);
        //   setDownloadUrl(url);
        //   link.href = url;
        //   link.click();
        // });
      };

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
                    if(onDraw) {
                        onDraw({ctx, point, prevPoint, otherProps});
                        setAnnotations([...annotations, { x: e.offsetX, y: e.offsetY }]);
                    }
                    if(channel) {
                        pushMessage(JSON.stringify({ctx, point, prevPoint, otherProps}), channel);
                    }
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
            clearCanvas( ctx, otherProps.width, otherProps.height );
        }

        if(otherProps.isImageSaved){
            saveImage();
        }
        return ()=>{
            if(otherProps.isParticipantAccess){
                removeMouseEventListeners();
            }else{
                if(otherProps.isModerator){
                    removeMouseEventListeners();
                }
            }
        }
    },[
        onDraw, 
        channel,
        otherProps.isCanvasClear
    ]);

    function setCanvasRef(ref){
        if(!ref) return;
        canvasRef.current = ref;
    }
    
    function onMouseDown(e){
        if(!canvasRef.current) return;
        isDrawingRef.current = true;
        setAnnotations([...annotations, { x: e.offsetX, y: e.offsetY }]);
    }
    
    return {
        setCanvasRef,
        onMouseDown
    };
}