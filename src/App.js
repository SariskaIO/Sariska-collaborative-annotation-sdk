import React, { useState } from 'react';
import './App.css';
import CreateChannel from './channel/CreateChannel';
import UseEventHandler from './hooks/UseEventHandler';
import DrawingBoard from './components/DrawingBoard';
import { useStore } from './store';
import { setRoom } from './store/action/room';
import { setUser } from './store/action/user';
import { SET_ROOM, SET_USER } from './store/action/types';
import { getRoomName, onDraw, onDrawCircle, onDrawEmoji, setAllRemoteTextBoxes } from './utils';
import { ANNOTATION_TOOLS } from './constants';

const App = (props)=> {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canvasCtx, setCanvasCtx] = useState(null);
  const [remoteTextboxes, setRemoteTextboxes] = useState([]);
  const roomName = props.roomName || getRoomName();
  const {users, dispatch} = useStore();
  console.log('roomName', roomName, users, props)
  const rtcChannel = CreateChannel(`rtc:${roomName}`, {});
  
  UseEventHandler(rtcChannel, 'ping', setLoading, message => {
    console.info('ping', message)
  })
  
  UseEventHandler(rtcChannel, 'user_joined', setLoading, async (response) => {
    const {room, user} = response;
    console.log('room, user', room, user)
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
      if(content?.ctx && Object.keys(content?.ctx)?.length){
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
            }
          }
        }
      setMessages(messages => [...messages, message])
  });
  

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
              setCanvasCtx={setCanvasCtx}
              remoteTextboxes={remoteTextboxes}
            />
  );
}

export default App;
