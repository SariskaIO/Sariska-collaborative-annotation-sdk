import { SARISKA_API_KEY } from "../config";
import { GENERATE_TOKEN_URL } from "../constants";

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
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth= width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
}

export function onDraw (data) {
    drawLine(data.ctx, data.point, data.prevPoint, data?.props?.lineColor,  data?.props?.lineWidth);
}

export function onDrawEmoji({ctx, point, emoji, emojis}) {
    ctx.font = '24px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    if(emojis?.length){
    emojis.forEach(({ x, y }) => {
        ctx.fillText(emoji || '😀', x, y);
      });
    }
    ctx.fillText(emoji || '😀', point.x, point.y); // Draw the latest emoji
}

export function onDrawCircle ({ ctx, center, radius, props }) {
    console.log('onDrawCircle def', radius, center, ctx)
    if (center) {
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
};

export const redrawCircles = ({ctx, circles, annotations, props}) => {
    clearCanvas(ctx, props.width, props.height);
    annotations?.forEach(annotation => {
        const {type, ...params} = annotation;
        if(type === 'pen'){
            onDraw(params);
        }else if(type === 'pen'){
            onDrawEmoji(params);
        }else{
            return;
        }
    })
    circles.forEach(({ center, radius }) => {
        onDrawCircle({ctx, center, radius, props});
    });
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