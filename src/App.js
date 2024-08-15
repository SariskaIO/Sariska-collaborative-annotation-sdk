// import React, { useState } from 'react';
// import './App.css';
// import SocketProvider from './context/socket/SocketProvider';
// import CreateChannel from './channel/CreateChannel';
// import UseEventHandler from './hooks/UseEventHandler';
// import DrawingBoard from './components/DrawingBoard';
// import { useStore } from './store';
// import { setRoom } from './store/action/room';
// import { setUser } from './store/action/user';
// import { SET_ROOM, SET_USER } from './store/action/types';
// import { clearCanvas, onDraw } from './utils';
// import Message from './components/Message';
// import { useSticker } from './hooks/useSticker';

// const App = (props)=> {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [canvasCtx, setCanvasCtx] = useState(null);
//   const roomName = 'sariska1';
//   const {users, dispatch} = useStore();

//   const { selectedEmoji, setSelectedEmoji, onMouseDown: onEmojiMouseDown } = useSticker(pushMessage, rtcChannel); // Use emoji hook
//   const emojiPositions = useSticker.emojiPositions; // Access emoji positions from useEmoji

  
//   const rtcChannel = CreateChannel(`rtc:${roomName}`, {});
  
//   UseEventHandler(rtcChannel, 'ping', setLoading, message => {
//     console.info('ping', message)
//   })

//   UseEventHandler(rtcChannel, 'user_joined', setLoading, async (response) => {
//     const {room, user} = response;
//     let userDetails = {id : user.id, name: user.name};
//     let roomDetails = {session_id : room.session_id, created_by: room.created_by, inserted_at: room.inserted_at};
//     dispatch(setRoom(SET_ROOM, roomDetails));
//     dispatch(setUser(SET_USER, userDetails));
//   })

//   UseEventHandler(rtcChannel, "presence_state", setLoading, (response) => {
//     console.log('presences_state', response);
//   })

//   UseEventHandler(rtcChannel, "presence_diff",setLoading, (response) => {
//     console.log('presence_diff', response);
//   })

//   UseEventHandler(rtcChannel, 'new_message', setLoading, message => {
//     let content = JSON.parse(message.content);
//     // if(props.content){
//     //   return message;
//     // }else{

//         if(Object.keys(content.ctx).length){
//         onDraw(content);
//       }else{
//         content.ctx = canvasCtx;
//         onDraw(content);
//       }
//       setMessages(messages => [...messages, message])
//     //}
//     // }
//   });

//   UseEventHandler(rtcChannel, 'archived_message', setLoading, message => {
//     setMessages(messages => [...messages, message])
//   });

//   const pushMessage = ( content, channel )=>{
//     const new_message = {
//       created_by_name: users.user.name,  
//       x: "uu", 
//       y: { x: "ghhg"}
//     };
//     new_message['content'] = content;
//     channel.push('new_message', new_message);
//   };

//   const handleSendEmoji = () => {
    
//       // Get canvas dimensions (assuming DrawingBoard provides them)
//         const canvasWidth = DrawingBoard.getCanvasWidth();
//         const canvasHeight = DrawingBoard.getCanvasHeight();
    
//         // Send emoji data over the channel
//         const emojiData = {
//           type: 'emoji',
//           emoji: selectedEmoji,
//           // Calculate relative position based on canvas size and emojiPositions
//           position: {
//             x: (emojiPositions[emojiPositions.length - 1].position.x / canvasWidth) * 100, // Percentage for network transmission
//             y: (emojiPositions[emojiPositions.length - 1].position.y / canvasHeight) * 100,
//           },
//         };
    
//         pushMessage(JSON.stringify(emojiData), rtcChannel);
    
//         // Clear selection and potentially update UI (optional)
//         setSelectedEmoji(null);
//       };
    
//   return (
//       // <>
//       //   {
//       //     props.content ?
//       //       <Message pushMessage={pushMessage} content={props.content} />
//       //       :
//             <DrawingBoard
//               inputProps={props}
//               pushMessage={pushMessage} 
//               loading={loading}
//               channel={rtcChannel}
//               setCanvasCtx={setCanvasCtx}
//               selectedEmoji={selectedEmoji}
//               setSelectedEmoji={setSelectedEmoji}
//               onEmojiMouseDown={onEmojiMouseDown}
//               emojiPositions={emojiPositions}
//             />
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import './App.css';
// import SocketProvider from './context/socket/SocketProvider';
// import CreateChannel from './channel/CreateChannel';
// import UseEventHandler from './hooks/UseEventHandler';
// import DrawingBoard from './components/DrawingBoard';
// import { useStore } from './store';
// import { setRoom } from './store/action/room';
// import { setUser } from './store/action/user';
// import { SET_ROOM, SET_USER } from './store/action/types';
// // import { clearCanvas, onDraw, onSticker } from './utils';
// import { clearCanvas, onSticker } from './utils';
// import Message from './components/Message';

// const App = (props)=> {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [canvasCtx, setCanvasCtx] = useState(null);
//   const roomName = 'sariska1';
//   const {users, dispatch} = useStore();

//   const rtcChannel = CreateChannel(`rtc:${roomName}`, {});
  
//   UseEventHandler(rtcChannel, 'ping', setLoading, message => {
//     console.info('ping', message)
//   })

//   UseEventHandler(rtcChannel, 'user_joined', setLoading, async (response) => {
//     const {room, user} = response;
//     let userDetails = {id : user.id, name: user.name};
//     let roomDetails = {session_id : room.session_id, created_by: room.created_by, inserted_at: room.inserted_at};
//     dispatch(setRoom(SET_ROOM, roomDetails));
//     dispatch(setUser(SET_USER, userDetails));
//   })

//   UseEventHandler(rtcChannel, "presence_state", setLoading, (response) => {
//     console.log('presences_state', response);
//   })

//   UseEventHandler(rtcChannel, "presence_diff",setLoading, (response) => {
//     console.log('presence_diff', response);
//   })

//   UseEventHandler(rtcChannel, 'new_message', setLoading, message => {
//     let content = JSON.parse(message.content);
//     // if(props.content){
//     //   return message;
//     // }else{
//     if(content.type === 'emoji' && content.position){
//         onSticker(content);
//     }
//     // else{
//       // if(Object.keys(content.ctx).length){
//       //   onDraw(content);
//       // }else{
//       //   content.ctx = canvasCtx;
//       //   onDraw(content);
//       // }
//     // }
//     setMessages(messages => [...messages, message])

//   });

//   UseEventHandler(rtcChannel, 'archived_message', setLoading, message => {
//     setMessages(messages => [...messages, message])
//   });

//   const pushMessage = ( content, channel )=>{
//     const new_message = {
//       created_by_name: users.user.name,  
//       x: "uu", 
//       y: { x: "ghhg"}
//     };
//     new_message['content'] = content;
//     channel.push('new_message', new_message);
//   };

//   return (
//       // <>
//       //   {
//       //     props.content ?
//       //       <Message pushMessage={pushMessage} content={props.content} />
//       //       :

//             <DrawingBoard
//               inputProps={props}
//               pushMessage={pushMessage} 
//               loading={loading}
//               channel={rtcChannel}
//               setCanvasCtx={setCanvasCtx}
//             />
//       //   }
//       // </>
//   );
// }

// export default App;


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
import { clearCanvas, onSticker } from './utils';
import Message from './components/Message';

const App = (props) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canvasCtx, setCanvasCtx] = useState(null);
  const roomName = 'sariska1';
  const { users, dispatch } = useStore();

  const rtcChannel = CreateChannel(`rtc:${roomName}`, {});
  
  UseEventHandler(rtcChannel, 'ping', setLoading, message => {
    console.info('ping', message);
  });

  UseEventHandler(rtcChannel, 'user_joined', setLoading, async (response) => {
    const { room, user } = response;
    const userDetails = { id: user.id, name: user.name };
    const roomDetails = { session_id: room.session_id, created_by: room.created_by, inserted_at: room.inserted_at };
    dispatch(setRoom(SET_ROOM, roomDetails));
    dispatch(setUser(SET_USER, userDetails));
  });

  UseEventHandler(rtcChannel, "presence_state", setLoading, (response) => {
    console.log('presence_state', response);
  });

  UseEventHandler(rtcChannel, "presence_diff", setLoading, (response) => {
    console.log('presence_diff', response);
  });

  UseEventHandler(rtcChannel, 'new_message', setLoading, message => {
    const content = JSON.parse(message.content);
    if (content.type === 'emoji' && content.position) {
      onSticker({
        ctx: canvasCtx,
        sticker: content.emoji,
        position: {
          x: (content.position.x / content.canvasWidth) * canvasCtx.canvas.width,
          y: (content.position.y / content.canvasHeight) * canvasCtx.canvas.height
        },
        scale: 1
      });
    } else{
      if(Object.keys(content.ctx).length){
        onDraw(content);
      }else{
        content.ctx = canvasCtx;
        onDraw(content);
      }
    }
    setMessages(messages => [...messages, message]);
  });

  UseEventHandler(rtcChannel, 'archived_message', setLoading, message => {
    setMessages(messages => [...messages, message]);
  });

  const pushMessage = (content, channel) => {
    const new_message = {
      created_by_name: users.user.name,  
      x: "uu", 
      y: { x: "ghhg" }
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
    />
  );
};

export default App;
