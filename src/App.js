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
import { clearCanvas, onDraw, onDrawCircle, onDrawEmoji } from './utils';
import Message from './components/Message';
import { ANNOTATION_TOOLS } from './constants';

const App = (props)=> {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canvasCtx, setCanvasCtx] = useState(null);
  const [remoteTextboxes, setRemoteTextboxes] = useState([]);
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
    console.log('new_message', message);
    let content = JSON.parse(message.content);
      if(content?.ctx && Object.keys(content?.ctx)?.length){
        if(props.annotationTool === ANNOTATION_TOOLS.pen){
          onDraw(content);
        }else if(props.annotationTool === ANNOTATION_TOOLS.circle){
          console.log('ANNOTATION_TOOLS.circle', content);
          content.props = {width: props.width, height: props.height};
          onDrawCircle(content);
        }else if(props.annotationTool === ANNOTATION_TOOLS.textBox){
          console.log('ANNOTATION_TOOLS.textbox', content);
         // onDrawCircle(content);
        }else{
          content.emojis = [...messages];
          console.log('ANNOTATION_TOOLS.emoji', content);
          onDrawEmoji(content);
        }
      }else{
        content.ctx = canvasCtx;
        console.log('else ctx');
        if(content.ctx){
          console.log('else content.ctx');
          if(props.annotationTool === ANNOTATION_TOOLS.pen){
            console.log('else content.ctx pen');
            onDraw(content);
          }else if(props.annotationTool === ANNOTATION_TOOLS.circle){
            console.log('ctxANNOTATION_TOOLS.circle', content);
            content.props = {width: props.width, height: props.height};
            onDrawCircle(content);
          }else if(props.annotationTool === ANNOTATION_TOOLS.textBox){
            console.log('ctxANNOTATION_TOOLS.textbox', content);

            if(content?.textbox){
              const {textbox} = content;
              console.log('first textbox', textbox)
              if(remoteTextboxes?.length){
                console.log('remoteTextboxes?.length', remoteTextboxes);
                let allRemoteTextBoxes = remoteTextboxes.map((remoteTextbox) => {
                  console.log('setRemoteTextboxes', remoteTextbox)
                  if (remoteTextbox.id === textbox.id) { 
                    console.log('remoteTextbox.id === textbox.id', remoteTextbox, textbox)
                    return {...textbox};
                  }else{
                    return {...textbox};
                  }
                });
                setRemoteTextboxes(allRemoteTextBoxes)
              }else{
                console.log('els setRemoteTextboxes', textbox)
                  setRemoteTextboxes([{...textbox}]);
                }
              }
            }
            // content.props = {width: props.width, height: props.height};
            // onDrawCircle(content);
          }else{
              content.emojis = [...messages];
              console.log('ctxANNOTATION_TOOLS.emoji', content);
              onDrawEmoji(content);
            }
          }
      setMessages(messages => [...messages, message])
    //}
  });
  console.log('remotetextbox', remoteTextboxes);

  const pushMessage = ( content, channel )=>{
    console.log('first pushMessage', content, channel)
    const new_message = {
      created_by_name: users.user.name,  
      x: "uu", 
      y: { x: "ghhg"}
    };
    new_message['content'] = content;
    channel.push('new_message', new_message);
  };

  return (
      // <>
      //   {
      //     props.content ?
      //       <Message pushMessage={pushMessage} content={props.content} />
      //       :

            <DrawingBoard
              inputProps={props}
              pushMessage={pushMessage} 
              loading={loading}
              channel={rtcChannel}
              setCanvasCtx={setCanvasCtx}
              remoteTextboxes={remoteTextboxes}
            />
      //   }
      // </>
  );
}

export default App;
