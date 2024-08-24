import React, { useState } from 'react';
import './App.css';
import SocketProvider from './context/socket/SocketProvider';
import CreateChannel from './channel/CreateChannel';
import UseEventHandler from './hooks/UseEventHandler';
import DrawingBoard from './components/DrawingBoard';
import { useStore } from './store';
import { setRoom } from './store/action/room';
import { setUser } from './store/action/user';
import { SET_ROOM, SET_USER } from './store/action/types';
import { clearCanvas, onDraw, onDrawEmoji } from './utils';
import Message from './components/Message';
import { ANNOTATION_TOOLS } from './constants';

const App = (props)=> {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canvasCtx, setCanvasCtx] = useState(null);
  const roomName = 'sariska1';
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
      if(content?.ctx && Object.keys(content?.ctx)?.length){
        if(props.annotationTool === ANNOTATION_TOOLS.pen){
          onDraw(content);
        }else{
          content.emojis = [...messages];
          onDrawEmoji(content);
        }
      }else{
        content.ctx = canvasCtx;
        if(props.annotationTool === ANNOTATION_TOOLS.pen){
          if(content.ctx){
            onDraw(content);
          }
        }else{
          if(content.ctx){
            content.emojis = [...messages];
            onDrawEmoji(content);
          }
        }
      }
    }else{
      content.ctx = canvasCtx;
      onDraw(content);
      if(props.isCanvasClear){
        clearCanvas( content.ctx, props.width, props.height );
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
      <>
        {/* <iframe
          src="http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&navpanes=0&scrollbar=0"
          height="500"
          width="700"
          title='stanford'
          style={{position: 'absolute', zIndex: 1}}
      ></iframe> */}
        {/* <img 
          alt='note'
          src={note} 
          width={700}
          height={500} 
          style={{position: 'absolute', zIndex: 1}}
          /> */}
        <DrawingBoard
          inputProps={props}
          messages={messages} 
          pushMessage={pushMessage} 
          loading={loading}
          channel={rtcChannel}
          setCanvasCtx={setCanvasCtx}
        />
      </>
  );
}

export default App;
