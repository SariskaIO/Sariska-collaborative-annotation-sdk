import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import CreateChannel from './channel/CreateChannel';
import UseEventHandler from './hooks/UseEventHandler';
import DrawingBoard from './components/DrawingBoard';
import { useStore } from './store';
import { setRoom } from './store/action/room';
import { setUser } from './store/action/user';
import { SET_ROOM, SET_USER } from './store/action/types';
import { getRoomName, initializeAnnotation, onDraw, onDrawCircle, onDrawEmoji, redraw, setAllRemoteTextBoxes } from './utils';
import { ANNOTATION_TOOLS } from './constants';

const App = (props)=> {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);
  const [canvasCtx, setCanvasCtx] = useState(null);
  const [remoteTextboxes, setRemoteTextboxes] = useState([]);
  const [annotation, setAnnotation] = useState([]);
  const roomName = props.roomName || getRoomName();
  const {users, dispatch} = useStore();
  const rtcChannel = CreateChannel(`rtc:${roomName}`, {});
  
  UseEventHandler(rtcChannel, 'ping', setLoading, message => {
    console.info('ping', message)
  })
  
  UseEventHandler(rtcChannel, 'user_joined', setLoading, async (response) => {
    const {room, user} = response;
    let userDetails = {id : user.id, name: user.name};
    let roomDetails = {session_id : room.session_id, created_by: room.created_by, inserted_at: room.inserted_at};
    dispatch(setRoom(SET_ROOM, roomDetails));
    dispatch(setUser(SET_USER, userDetails));
  })

  UseEventHandler(rtcChannel, "presence_state", setLoading, (response) => {
    console.log('presences_state', response);
  })

  UseEventHandler(rtcChannel, "presence_diff",setLoading, (response) => {
    console.log('presence_diff', response);
  })

  UseEventHandler(rtcChannel, 'new_message', setLoading, message => {
    let content = JSON.parse(message.content);
    console.log('new_message', content, canvasCtx)
      if(content?.ctx && Object.keys(content?.ctx)?.length){
        if(props.annotationTool === ANNOTATION_TOOLS.pen){
          initializeAnnotation('pen', canvasCtx, canvasRef);
          drawAnnotation('pen', canvasCtx, canvasRef)
          stopAnnotation(type, canvasCtx)
         // onDraw(content);
        }else if(props.annotationTool === ANNOTATION_TOOLS.circle){
          content.props = {width: props.width, height: props.height};
         // onDrawCircle(content);
          redraw(canvasCtx, canvasRef, annotation)
        }else if(props.annotationTool === ANNOTATION_TOOLS.textbox){
         setAllRemoteTextBoxes(content, remoteTextboxes, setRemoteTextboxes)
        }else{
          content.emojis = [...messages];
          onDrawEmoji(content);
        redraw(canvasCtx, canvasRef, annotation)
        }
      }else{
        content.ctx = canvasCtx;
        if(content.ctx){
          if(props.annotationTool === ANNOTATION_TOOLS.pen){
            onDraw(content);
          }else if(props.annotationTool === ANNOTATION_TOOLS.circle){
            content.props = {width: props.width, height: props.height};
            onDrawCircle(content);
          }else if(props.annotationTool === ANNOTATION_TOOLS.textbox){
            setAllRemoteTextBoxes(content, remoteTextboxes, setRemoteTextboxes)
          }else{
              content.emojis = [...messages];
              onDrawEmoji(content);
             // redraw(canvasCtx, canvasRef, annotation)
            }
          }
        }
      setAnnotation(annotation => [...annotation, content.annotation]);
      setMessages(messages => [...messages, content])
  });
  
  useEffect(()=>{
    redraw(canvasCtx, canvasRef, annotation);
  },[messages?.length])

console.log('messages', messages, annotation)
  const pushMessage = ( content, channel )=>{
    const new_message = {
      created_by_name: users.user.name,  
      x: "uu", 
      y: { x: "ghhg"}
    };
    new_message['content'] = content;
    channel.push('new_message', new_message);
  };

  return (
            <DrawingBoard
              inputProps={props}
              pushMessage={pushMessage} 
              loading={loading}
              channel={rtcChannel}
              canvasRef={canvasRef}
              canvasCtx={canvasCtx}
              setCanvasCtx={setCanvasCtx}
              remoteTextboxes={remoteTextboxes}
            />
  );
}

export default App;
