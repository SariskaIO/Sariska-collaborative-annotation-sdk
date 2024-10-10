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
  const [currentPath, setCurrentPath] = useState([]); // Store freehand paths
  const [paths, setPaths] = useState([]); // Store freehand paths
  const [emojis, setEmojis] = useState([]); // Store emoji positions
  const [circles, setCircles] = useState([]); // Store circle data
  const [currentCircle, setCurrentCircle] = useState(null); // Store current circle being drawn
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
    console.log('new_message', content, canvasCtx);
    if(content && content.currentPath && content.currentPath?.length){
      setCurrentPath(prev => ([...prev, content.currentPath]));
    }else if(content && content.currentPath && !content.currentPath?.length){
      setCurrentPath([]);
    }
    if(content && content.pen){
      setPaths(prev => ([...prev, content.pen]));
    }
    if(content && content.circle){
      setCircles(prev => ([...prev, content.circle]));
    }
    if(content && content.emoji){
      setEmojis(prev => ([...prev, content.emoji]));
    }
    if(content && content.currentCircle){
      setCurrentCircle(content.currentCircle);
    }
    if(content && content.textBox){
      setRemoteTextboxes(prev => ([...prev, content.textBox]));
    }
      // if(content?.ctx && Object.keys(content?.ctx)?.length){
      //   if(props.annotationTool === ANNOTATION_TOOLS.pen){
      //     initializeAnnotation('pen', canvasCtx, canvasRef);
      //     drawAnnotation('pen', canvasCtx, canvasRef)
      //     stopAnnotation(type, canvasCtx)
      //    // onDraw(content);
      //   }else if(props.annotationTool === ANNOTATION_TOOLS.circle){
      //     content.props = {width: props.width, height: props.height};
      //    // onDrawCircle(content);
      //     redraw(canvasCtx, canvasRef, annotation)
      //   }else if(props.annotationTool === ANNOTATION_TOOLS.textbox){
      //    setAllRemoteTextBoxes(content, remoteTextboxes, setRemoteTextboxes)
      //   }else{
      //     content.emojis = [...messages];
      //     onDrawEmoji(content);
      //   redraw(canvasCtx, canvasRef, annotation)
      //   }
      // }else{
      //   content.ctx = canvasCtx;
      //   if(content.ctx){
      //     if(props.annotationTool === ANNOTATION_TOOLS.pen){
      //       onDraw(content);
      //     }else if(props.annotationTool === ANNOTATION_TOOLS.circle){
      //       content.props = {width: props.width, height: props.height};
      //       onDrawCircle(content);
      //     }else if(props.annotationTool === ANNOTATION_TOOLS.textbox){
      //       setAllRemoteTextBoxes(content, remoteTextboxes, setRemoteTextboxes)
      //     }else{
      //         content.emojis = [...messages];
      //         onDrawEmoji(content);
      //        // redraw(canvasCtx, canvasRef, annotation)
      //       }
      //     }
      //   }
     //setAnnotation(annotation => [...annotation, content.annotation]);
      setMessages(messages => [...messages, content])
  });
  
  // useEffect(()=>{
  //   if(canvasCtx && canvasRef?.current){
  //     redraw(canvasCtx, canvasRef, annotation);
  //   }
  // },[messages?.length])

  useEffect(() => {
    if(!canvasRef?.current){
      return;
    }
    console.log('canvasRef', canvasRef, canvasRef?.current, canvasCtx, paths)
    const canvas = canvasRef?.current;
    const context = canvas.getContext('2d');
    const handleResize = () => {
      const canvas = canvasRef.current;
      canvas.width = props.width;
      canvas.height = props.height;

      redraw(context, canvasRef, paths, circles, emojis, currentCircle, props); // Redraw existing drawings based on new size
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial canvas size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [paths, emojis, circles, currentCircle]);

  useEffect(()=>{
    console.log('first currentPath', currentPath)
    // canvasCtx.beginPath();
    // canvasCtx.moveTo(currentPath[0].x, currentPath[0].y);
    // currentPath?.forEach(path => {
    //   canvasCtx.lineTo(path.x, path.y);
    //   canvasCtx.strokeStyle = 'red';
    //   canvasCtx.lineWidth = 2;
    //   canvasCtx.stroke();
    //   canvasCtx.closePath();
    // })
  },[currentPath])

console.log('messages', messages, emojis, circles, paths, currentCircle);
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
