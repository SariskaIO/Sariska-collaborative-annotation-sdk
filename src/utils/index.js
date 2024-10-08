import { SARISKA_API_KEY } from "../config";
import { ANNOTATION_TOOLS, GENERATE_TOKEN_URL } from "../constants";

export function getUserId() {
    let storedUserId = JSON.parse((localStorage.getItem('sariska-collaborative-userId')));
    if(storedUserId){
        return storedUserId;
    }
    const characters ='abcdefghijklmnopqrstuvwxyz0123456789';
    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    let userId = generateString(12).trim();
    localStorage.setItem('sariska-collaborative-userId', JSON.stringify(userId));
    return userId;
} 

export function getUserName() {
    let storedUserName = JSON.parse((localStorage.getItem('sariska-collaborative-userName')));
    if(storedUserName){
        return storedUserName;
    }
    const characters ='abcdefghijklmnopqrstuvwxyz';
    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const str = generateString(8).trim()
    const strArr = str.match(/.{4}/g);
    const userName = strArr.join("_")
    localStorage.setItem('sariska-collaborative-userName', JSON.stringify(userName));
    return userName;
} 

export function getRoomId() {
    let storedRoomId = JSON.parse((localStorage.getItem('sariska-collaborative-roomId')));
    if(storedRoomId){
        return storedRoomId;
    }
    const characters ='abcdefghijklmnopqrstuvwxyz0123456789';
    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const roomId = generateString(9).trim();
    localStorage.setItem('sariska-collaborative-roomId', JSON.stringify(roomId));
    return roomId;
} 

export function getRoomName() {
    let storedRoomName = JSON.parse((localStorage.getItem('sariska-collaborative-roomName')));
    if(storedRoomName){
        return storedRoomName;
    }
    const characters ='abcdefghijklmnopqrstuvwxyz';
    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const str = generateString(9).trim()
    const strArr = str.match(/.{3}/g);
    const roomName = strArr.join("-")
    localStorage.setItem('sariska-collaborative-roomName', JSON.stringify(roomName));
    return roomName;
} 

export const getToken = async (username, userId)=> {
    const body = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: `${SARISKA_API_KEY}`, // enter your app secret,
            user: {
                id: userId,
                name: username
            },
        })
    };

    try {
        const response = await fetch(GENERATE_TOKEN_URL, body);
        if (response.ok) {
            const json = await response.json();
            let token = json.token;
            localStorage.setItem('sariska-colloborative-token', JSON.stringify(token));
            return json.token;
        } else {
            console.log(response.status);
        }
    } catch (error) {
        console.log(error);
    }

}

export const renderAction = (type, payload) => {
    if(payload){
        return {
            type,
            payload
        }
    }else{
        return {
            type
        }
    }
}


export function clearCanvas(ctx, width, height){
    ctx.clearRect(0, 0, width, height)
}

export function drawLine(ctx, end, start, color, width) {
    if(!ctx) return;
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth= width;
    ctx.strokeStyle = color;
    ctx.moveTo(start?.x, start?.y);
    ctx.lineTo(end?.x, end?.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start?.x, start?.y, 2, 0, 2 * Math.PI);
    ctx.fill();
}

export function onDraw (data) {
    drawLine(data.ctx, data.point, data.prevPoint, data?.props?.lineColor,  data?.props?.lineWidth);
}

export function onDrawEmoji({ctx, point, emoji, emojis}) {
    if(!ctx) return;
    ctx.font = '24px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'red';
    if(emojis?.length){
    emojis.forEach(({ x, y }) => {
        ctx.fillText(emoji || '😀', x, y);
      });
    }
    ctx.fillText(emoji || '😀', point?.x, point?.y); // Draw the latest emoji
}

export function onDrawCircle ({ ctx, center, radius, props }) {
    if(!ctx) return;
    if (center) {
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
};

export function computePointInCanvas(clientX, clientY, refCurrent){
    if(refCurrent){
        const boundingRect = refCurrent.getBoundingClientRect();
        return {
            x: clientX - boundingRect.left,
            y: clientY - boundingRect.top
        }
    }else{
        return null;
    }
}

export const calculateCircleRadius = (startPos, currentPos) => {
    return Math.sqrt(
        Math.pow(currentPos.x - startPos.x, 2) +
        Math.pow(currentPos.y - startPos.y, 2)
    );
}

export const measureText = (text, maxWidth, canvasRef) => {
    const ctx = canvasRef?.current?.getContext('2d');
    ctx.font = '16px Arial';

    const words = text.split(' ');
    let line = '';
    let height = 32; // Start with min height
    let width = 0;

    words.forEach((word, index) => {
        let testLine = line + word;
        if (index < words.length - 1) {
            testLine += ' ';
        }
        const testWidth = ctx.measureText(testLine).width;

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

export const getAllRemoteTextBoxes =(remoteTextboxes, textbox) => {
    let allRemoteTextBoxes = remoteTextboxes?.map((remoteTextbox) => {
        if (remoteTextbox.id === textbox.id) { 
          return {...textbox};
        }else{
          return {...remoteTextbox};
        }
      });
      if(!allRemoteTextBoxes?.some(remoteTextbox =>remoteTextbox.id === textbox.id )){
        allRemoteTextBoxes.push(textbox);
      }
      return allRemoteTextBoxes;
}

export const setAllRemoteTextBoxes = (content, remoteTextboxes, setRemoteTextboxes) => {
    if(content?.textbox){
        const {textbox} = content;
        if(remoteTextboxes?.length){
          let allRemoteTextBoxes = getAllRemoteTextBoxes(remoteTextboxes, textbox);
          setRemoteTextboxes(allRemoteTextBoxes)
        }else{
            setRemoteTextboxes([{...textbox}]);
        }
    }
}

export const redrawAnnotations = ({ctx, annotations, props}) => {
    if(!ctx) return;
    if(props.annotationTools !== ANNOTATION_TOOLS.emoji){
        clearCanvas(ctx, props.width, props.height);
    }
    annotations?.forEach(annotation => {
        const {type, ...params} = annotation;
        if(type === 'pen'){
            onDraw(params);
        }else if(type === 'emoji'){
            onDrawEmoji(params);
        }else if(type === 'circle'){
            onDrawCircle({ ctx, center: annotation.center, radius: annotation.radius, props });
        }else{
            return;
        }
    })
};


export const getCanvasPosition = (e, canvasRef) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
  };

export const redraw = (context, canvasRef, annotation) => {
    if(!context && !(canvasRef && canvasRef?.current)) return;
    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    if(annotation && annotation?.length){
        let paths = annotation?.filter(item => item.type === 'pen');
        let circles = annotation?.filter(item => item.type === 'circle');
        let emojis = annotation?.filter(item => item.type === 'emoji');
        let currentCircle = annotation?.filter(item => item.type === 'currentCircle')[0]?.circle;
        console.log('annotationpath', annotation, paths, circles, emojis, currentCircle);

        // Redraw freehand paths
        paths.forEach((item) => {
            if (item.pen?.length > 0) {
                const path = item.pen;
                const startX = path[0].x * canvas.width;
                const startY = path[0].y * canvas.height;
                context.beginPath();
                context.moveTo(startX, startY);

                path.forEach((point) => {
                const x = point.x * canvas.width;
                const y = point.y * canvas.height;
                context.lineTo(x, y);
                });

                context.strokeStyle = 'red';
                context.lineWidth = 2;
                context.stroke();
                context.closePath();
            }
        });

        // Redraw circles
        circles.forEach((item) => {
        if(item?.circle){
            const circle = item.circle;
            const centerX = circle.x * canvas.width;
            const centerY = circle.y * canvas.height;
            const radius = circle.radius * canvas.width; // Using width scaling for simplicity
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, Math.PI * 2);
            context.strokeStyle = 'blue';
            context.lineWidth = 2;
            context.stroke();
            context.closePath();
        }
        });

        // If currently drawing a circle, draw it
        
        if (currentCircle) {
            const centerX = currentCircle.x * canvas.width;
            const centerY = currentCircle.y * canvas.height;
            const radius = currentCircle.radius * canvas.width;
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, Math.PI * 2);
            context.strokeStyle = 'blue';
            context.lineWidth = 2;
            context.stroke();
            context.closePath();
        }

            // Redraw emojis
        emojis.forEach((item) => {
            if(item.emoji){
                let emoji = item.emoji;
                const x = emoji.x * canvas.width;
                const y = emoji.y * canvas.height;
                context.font = '30px Arial';
                context.fillText(emoji.emoji, x-15,y+15);
            }
        });
    }
  };