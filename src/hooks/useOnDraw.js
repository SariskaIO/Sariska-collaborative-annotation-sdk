import { useEffect, useRef, useState } from "react";
import { clearCanvas, computePointInCanvas, onDraw, redrawAnnotations } from "../utils";

export function useOnDraw(
    pushMessage,
    channel,
    setCanvasCtx,
    annotations,
    setAnnotations,
    otherProps
    ){
    const [annotation, setAnnotation] = useState([]);

    const canvasRef = useRef(null);
    const prevPointRef = useRef()
    const isDrawingRef = useRef(false);

    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    // const saveImage = () => {
    //     console.log('saveImage')
    //     const context = canvasRef.current.getContext('2d');
    //     const image = new Image();
    //     image.src = otherProps.imageUrl;
    //     image.onload = () => {
    //       // Draw the image onto the canvas
    //       context.drawImage(image, 0, 0, 800, 600);
    
    //       // Draw the annotations onto the canvas
    //       context.strokeStyle = otherProps?.lineColor;
    //       context.lineWidth = otherProps?.lineWidth;
    //       annotations.forEach((annotation, index) => {
    //         if (index === 0) {
    //           context.beginPath();
    //           context.moveTo(annotation.x, annotation.y);
    //         } else {
    //           context.lineTo(annotation.x, annotation.y);
    //           context.stroke();
    //         }
    //       });
    
    //       // Convert the canvas to an image and open it in a new tab
    //       const imageDataUrl = canvasRef.current.toDataURL('image/png');
    //       console.log('first imageDataUrl', imageDataUrl)
    //       const newWindow = window.open('about:blank', 'image from canvas');
    //       newWindow.document.write('<img src="' + imageDataUrl + '" alt="Saved Annotation" />');
    //     };
    //     // const canvas = canvasRef.current;
    //     // const link = document.createElement('a');
    //     // link.download = 'image_with_drawing.png';
    //     // canvas.toBlob((blob) => {
    //     //   const url = URL.createObjectURL(blob);
    //     //   setDownloadUrl(url);
    //     //   link.href = url;
    //     //   link.click();
    //     // });
    //   };
    
    useEffect(()=>{
        const ctx = canvasRef?.current?.getContext('2d');
        const {parentCanvasRef, ...props} = otherProps;
        parentCanvasRef.current = canvasRef?.current;
        console.log('draw ctx', ctx, canvasRef?.current)
        setCanvasCtx(ctx);
        
        function initMouseMoveListener(){
            const mouseMoveListener = (e) => {
                if(isDrawingRef.current){
                    const point = computePointInCanvas(e.clientX, e.clientY, canvasRef?.current);
                    let prevPoint = prevPointRef.current;
                    if(onDraw) {
                        onDraw({ctx, point, prevPoint, props});
                        setAnnotation(annotation => ([...annotation, {ctx, point, prevPoint, props}]));
                        setAnnotations(annotations => ([...annotations, {type: 'pen', ctx, point, prevPoint, props}]));
                        redrawAnnotations({ctx, annotations, props});
                    }
                    if(channel) {
                        pushMessage(JSON.stringify({ctx, point, prevPoint, props}), channel);
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

        if(props.isParticipantAccess){
            initMouseMoveListener();
            initMouseUpListener();
        }else{
            if(props.isModerator){
                initMouseMoveListener();
                initMouseUpListener();
            }
        }
        
        if(props.isCanvasClear){
            clearCanvas( ctx, props.width, props.height );
        }

        if(props.isImageSaved){
            props.saveImage(annotation);
        }
        return ()=>{
            if(props.isParticipantAccess){
                removeMouseEventListeners();
            }else{
                if(props.isModerator){
                    removeMouseEventListeners();
                }
            }
        }
    },[
        onDraw, 
        channel,
        otherProps.isCanvasClear,
        otherProps.isImageSaved,
        otherProps.lineColor,
        otherProps,

    ]);

    function setCanvasRef(ref){
        if(!ref) return;
        canvasRef.current = ref;
    }
    
    function onMouseDown(e){
        if(!canvasRef?.current) return;
        const {parentCanvasRef, ...props} = otherProps;
        isDrawingRef.current = true;
        const ctx = canvasRef?.current?.getContext('2d');
        const point = computePointInCanvas(e.clientX, e.clientY, canvasRef?.current);
        let prevPoint = prevPointRef.current;
        setAnnotation(annotation => ([...annotation, {ctx, point, prevPoint, props}]));
        setAnnotations(annotations => ([...annotations, {type: 'pen', ctx, point, prevPoint, props}]));
    }
    
    return {
        setCanvasRef,
        onMouseDown
    };
}