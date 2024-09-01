(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("sariska-collaborative-annotation-sdk", ["React"], factory);
	else if(typeof exports === 'object')
		exports["sariska-collaborative-annotation-sdk"] = factory(require("react"));
	else
		root["sariska-collaborative-annotation-sdk"] = factory(root["React"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_react__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var _context_socket_SocketProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context/socket/SocketProvider */ "./src/context/socket/SocketProvider.js");
/* harmony import */ var _channel_CreateChannel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./channel/CreateChannel */ "./src/channel/CreateChannel.js");
/* harmony import */ var _hooks_UseEventHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hooks/UseEventHandler */ "./src/hooks/UseEventHandler.js");
/* harmony import */ var _components_DrawingBoard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/DrawingBoard */ "./src/components/DrawingBoard/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./store */ "./src/store/index.js");
/* harmony import */ var _store_action_room__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store/action/room */ "./src/store/action/room.js");
/* harmony import */ var _store_action_user__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./store/action/user */ "./src/store/action/user.js");
/* harmony import */ var _store_action_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./store/action/types */ "./src/store/action/types.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils */ "./src/utils/index.js");
/* harmony import */ var _components_Message__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/Message */ "./src/components/Message/index.js");
/* harmony import */ var _components_Message__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_components_Message__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./constants */ "./src/constants/index.js");













const App = props => {
  const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [canvasCtx, setCanvasCtx] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [remoteTextboxes, setRemoteTextboxes] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const roomName = 'sariska1';
  const {
    users,
    dispatch
  } = (0,_store__WEBPACK_IMPORTED_MODULE_6__.useStore)();
  const rtcChannel = (0,_channel_CreateChannel__WEBPACK_IMPORTED_MODULE_3__["default"])("rtc:".concat(roomName), {});
  (0,_hooks_UseEventHandler__WEBPACK_IMPORTED_MODULE_4__["default"])(rtcChannel, 'ping', setLoading, message => {
    console.info('ping', message);
  });
  (0,_hooks_UseEventHandler__WEBPACK_IMPORTED_MODULE_4__["default"])(rtcChannel, 'user_joined', setLoading, async response => {
    const {
      room,
      user
    } = response;
    let userDetails = {
      id: user.id,
      name: user.name
    };
    let roomDetails = {
      session_id: room.session_id,
      created_by: room.created_by,
      inserted_at: room.inserted_at
    };
    dispatch((0,_store_action_room__WEBPACK_IMPORTED_MODULE_7__.setRoom)(_store_action_types__WEBPACK_IMPORTED_MODULE_9__.SET_ROOM, roomDetails));
    dispatch((0,_store_action_user__WEBPACK_IMPORTED_MODULE_8__.setUser)(_store_action_types__WEBPACK_IMPORTED_MODULE_9__.SET_USER, userDetails));
  });
  (0,_hooks_UseEventHandler__WEBPACK_IMPORTED_MODULE_4__["default"])(rtcChannel, "presence_state", setLoading, response => {
    console.log('presences_state', response);
  });
  (0,_hooks_UseEventHandler__WEBPACK_IMPORTED_MODULE_4__["default"])(rtcChannel, "presence_diff", setLoading, response => {
    console.log('presence_diff', response);
  });
  (0,_hooks_UseEventHandler__WEBPACK_IMPORTED_MODULE_4__["default"])(rtcChannel, 'new_message', setLoading, message => {
    var _Object$keys;
    console.log('new_message', message);
    let content = JSON.parse(message.content);
    if (content !== null && content !== void 0 && content.ctx && (_Object$keys = Object.keys(content === null || content === void 0 ? void 0 : content.ctx)) !== null && _Object$keys !== void 0 && _Object$keys.length) {
      if (props.annotationTool === _constants__WEBPACK_IMPORTED_MODULE_12__.ANNOTATION_TOOLS.pen) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_10__.onDraw)(content);
      } else if (props.annotationTool === _constants__WEBPACK_IMPORTED_MODULE_12__.ANNOTATION_TOOLS.circle) {
        content.props = {
          width: props.width,
          height: props.height
        };
        (0,_utils__WEBPACK_IMPORTED_MODULE_10__.onDrawCircle)(content);
        // }else if(props.annotationTool === ANNOTATION_TOOLS.textbox){
        //   console.log('ANNOTATION_TOOLS.textbox', content);
        //  setAllRemoteTextBoxes(content, remoteTextboxes, setRemoteTextboxes)
      } else {
        content.emojis = [...messages];
        (0,_utils__WEBPACK_IMPORTED_MODULE_10__.onDrawEmoji)(content);
      }
    } else {
      content.ctx = canvasCtx;
      if (content.ctx) {
        if (props.annotationTool === _constants__WEBPACK_IMPORTED_MODULE_12__.ANNOTATION_TOOLS.pen) {
          (0,_utils__WEBPACK_IMPORTED_MODULE_10__.onDraw)(content);
        } else if (props.annotationTool === _constants__WEBPACK_IMPORTED_MODULE_12__.ANNOTATION_TOOLS.circle) {
          content.props = {
            width: props.width,
            height: props.height
          };
          (0,_utils__WEBPACK_IMPORTED_MODULE_10__.onDrawCircle)(content);
          // }else if(props.annotationTool === ANNOTATION_TOOLS.textbox){
          //   setAllRemoteTextBoxes(content, remoteTextboxes, setRemoteTextboxes)
        } else {
          content.emojis = [...messages];
          (0,_utils__WEBPACK_IMPORTED_MODULE_10__.onDrawEmoji)(content);
        }
      }
    }
    setMessages(messages => [...messages, message]);
  });
  const pushMessage = (content, channel) => {
    const new_message = {
      created_by_name: users.user.name,
      x: "uu",
      y: {
        x: "ghhg"
      }
    };
    new_message['content'] = content;
    channel.push('new_message', new_message);
  };
  return (
    /*#__PURE__*/
    // <>
    //   {
    //     props.content ?
    //       <Message pushMessage={pushMessage} content={props.content} />
    //       :
    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_DrawingBoard__WEBPACK_IMPORTED_MODULE_5__["default"], {
      inputProps: props,
      pushMessage: pushMessage,
      loading: loading,
      channel: rtcChannel,
      setCanvasCtx: setCanvasCtx,
      remoteTextboxes: remoteTextboxes
    })
    //   }
    // </>
  );
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/channel/CreateChannel.js":
/*!**************************************!*\
  !*** ./src/channel/CreateChannel.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_socket_SocketContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/socket/SocketContext */ "./src/context/socket/SocketContext.js");


const CreateChannel = function (topic) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const socket = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_socket_SocketContext__WEBPACK_IMPORTED_MODULE_1__["default"]);
  const [channel, setChannel] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!socket) {
      return;
    }
    const ch = socket.channel(topic, params);
    ch.join().receive('ignore', () => console.log('Access Denied.')).receive('ok', () => console.log('Access granted!')).receive('timeout', () => console.log('Timeout.'));
    setChannel(ch);
    return () => {
      if (ch) {
        ch.leave();
      }
    };
  }, [socket]);
  return channel;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateChannel);

/***/ }),

/***/ "./src/components/Canvas/index.js":
/*!****************************************!*\
  !*** ./src/components/Canvas/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useOnDraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useOnDraw */ "./src/hooks/useOnDraw.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants */ "./src/constants/index.js");
/* harmony import */ var _hooks_useOnEmoji__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useOnEmoji */ "./src/hooks/useOnEmoji.js");
/* harmony import */ var _hooks_useOnCircle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useOnCircle */ "./src/hooks/useOnCircle.js");





//import { useOnTextBox } from '../../hooks/useOnTextBox';

const Canvas = _ref => {
  let {
    width,
    height,
    pushMessage,
    channel,
    setCanvasCtx,
    inputProps,
    remoteTextboxes
  } = _ref;
  const {
    children,
    ...otherProps
  } = inputProps;
  const [annotations, setAnnotations] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const emojiHook = (0,_hooks_useOnEmoji__WEBPACK_IMPORTED_MODULE_3__.useOnEmoji)(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
  const circleHook = (0,_hooks_useOnCircle__WEBPACK_IMPORTED_MODULE_4__.useOnCircle)(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
  // const textboxHook = useOnTextBox(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
  const drawHook = (0,_hooks_useOnDraw__WEBPACK_IMPORTED_MODULE_1__.useOnDraw)(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps);
  console.log('annotaiotnsa', annotations, inputProps);
  // Use logic to select the correct hook result
  const {
    setCanvasRef,
    onMouseDown,
    handleTextChange,
    textboxes
  } = inputProps.annotationTool === _constants__WEBPACK_IMPORTED_MODULE_2__.ANNOTATION_TOOLS.emoji ? emojiHook : inputProps.annotationTool === _constants__WEBPACK_IMPORTED_MODULE_2__.ANNOTATION_TOOLS.circle ? circleHook :
  //inputProps.annotationTool === ANNOTATION_TOOLS.textbox ? textboxHook : 
  drawHook;
  const canvasStyle = {
    position: 'absolute',
    zIndex: otherProps.zIndex,
    background: 'none'
  };
  let textboxList = textboxes !== null && textboxes !== void 0 && textboxes.length ? textboxes : remoteTextboxes !== null && remoteTextboxes !== void 0 && remoteTextboxes.length ? remoteTextboxes : [];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {
    width: width,
    height: height,
    style: canvasStyle,
    ref: setCanvasRef,
    onMouseDown: onMouseDown
  }), textboxList !== null && textboxList !== void 0 && textboxList.length ? textboxList === null || textboxList === void 0 ? void 0 : textboxList.map(textbox => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
    key: textbox.id,
    style: {
      position: 'absolute',
      top: textbox.y + 'px',
      left: textbox.x + 'px',
      width: textbox.width + 'px',
      height: textbox.height + 'px',
      resize: 'none',
      overflow: 'hidden',
      boxSizing: 'border-box',
      maxWidth: "".concat(Math.min(200, 600 - textbox.x), "px"),
      maxHeight: "".concat(Math.min(96, 500 - textbox.y), "px"),
      zIndex: otherProps.zIndex
    },
    value: textbox.text,
    onChange: e => handleTextChange(e, textbox.id),
    autoFocus: true
  })) : null, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Canvas);

/***/ }),

/***/ "./src/components/DrawingBoard/index.js":
/*!**********************************************!*\
  !*** ./src/components/DrawingBoard/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store */ "./src/store/index.js");
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Canvas */ "./src/components/Canvas/index.js");



const DrawingBoard = _ref => {
  let {
    pushMessage,
    channel,
    setCanvasCtx,
    remoteTextboxes,
    loading,
    inputProps
  } = _ref;
  const [point, setPoint] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const {
    users: {
      user
    },
    rooms: {
      room
    }
  } = (0,_store__WEBPACK_IMPORTED_MODULE_1__.useStore)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Canvas__WEBPACK_IMPORTED_MODULE_2__["default"], {
    width: inputProps.width,
    height: inputProps.height,
    pushMessage: pushMessage,
    channel: channel,
    setCanvasCtx: setCanvasCtx,
    inputProps: inputProps,
    remoteTextboxes: remoteTextboxes
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawingBoard);

/***/ }),

/***/ "./src/components/Message/index.js":
/*!*****************************************!*\
  !*** ./src/components/Message/index.js ***!
  \*****************************************/
/***/ (() => {

// import React from 'react'
// import useOnMessage from '../../hooks/useOnMessage'

// const Message = ({pushMessage, content}) => {
//     useOnMessage(pushMessage, content);
//   return (
//     null
//   )
// }

// export default Message

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MESSAGING_API_SERVICE_HOST: () => (/* binding */ MESSAGING_API_SERVICE_HOST),
/* harmony export */   SARISKA_API_KEY: () => (/* binding */ SARISKA_API_KEY),
/* harmony export */   SARISKA_COMPANY_NAME: () => (/* binding */ SARISKA_COMPANY_NAME),
/* harmony export */   SARISKA_WEBSITE: () => (/* binding */ SARISKA_WEBSITE),
/* harmony export */   WEB_SOCKET_URL: () => (/* binding */ WEB_SOCKET_URL)
/* harmony export */ });
const SARISKA_API_KEY = {"REACT_APP_SARISKA_MEET_APP_API_KEY":"27fd6f9e85c304447d3cc0fb31e7ba8062df58af86ac3f9437","REACT_APP_API_SERVICE_HOST":"https://api.sariska.io","REACT_APP_API_SERVICE_ORIGIN":"api.sariska.io","REACT_APP_WEBSOCKET_SERVICE_HOST":"wss://api.sariska.io","REACT_APP_API_SERVICE_HOST_NAME":"chat.sariska.io","REACT_APP_LOGO":"https://assets.sariska.io/Logo_Sariska.svg","REACT_APP_TITLE":"Sariska Chat App"}.REACT_APP_SARISKA_MEET_APP_API_KEY;
const MESSAGING_API_SERVICE_HOST = "".concat({"REACT_APP_SARISKA_MEET_APP_API_KEY":"27fd6f9e85c304447d3cc0fb31e7ba8062df58af86ac3f9437","REACT_APP_API_SERVICE_HOST":"https://api.sariska.io","REACT_APP_API_SERVICE_ORIGIN":"api.sariska.io","REACT_APP_WEBSOCKET_SERVICE_HOST":"wss://api.sariska.io","REACT_APP_API_SERVICE_HOST_NAME":"chat.sariska.io","REACT_APP_LOGO":"https://assets.sariska.io/Logo_Sariska.svg","REACT_APP_TITLE":"Sariska Chat App"}.REACT_APP_API_SERVICE_HOST, "/api/v1/messaging");
const WEB_SOCKET_URL = "".concat({"REACT_APP_SARISKA_MEET_APP_API_KEY":"27fd6f9e85c304447d3cc0fb31e7ba8062df58af86ac3f9437","REACT_APP_API_SERVICE_HOST":"https://api.sariska.io","REACT_APP_API_SERVICE_ORIGIN":"api.sariska.io","REACT_APP_WEBSOCKET_SERVICE_HOST":"wss://api.sariska.io","REACT_APP_API_SERVICE_HOST_NAME":"chat.sariska.io","REACT_APP_LOGO":"https://assets.sariska.io/Logo_Sariska.svg","REACT_APP_TITLE":"Sariska Chat App"}.REACT_APP_WEBSOCKET_SERVICE_HOST, "/api/v1/messaging/websocket");
const SARISKA_WEBSITE = 'https://sariska.io';
const SARISKA_COMPANY_NAME = 'Sariska.io';

// export const SARISKA_API_SERVICE_HOST = process.env.NODE_ENV === 'development' ? 'https://api.dev.sariska.io' :  'https://api.sariska.io';
// export const SARISKA_API_KEY = process.env.NODE_ENV === 'development' ? "2ffd6f9497ce12122f30d5ec26f1ed923a8a47f98ebc2a8f2b" : '27fd6f9e85c304447d3cc0fb31e7ba8062df58af86ac3f9437';

// export const MESSAGING_API_SERVICE_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api/v1/messaging' ?? 'https://api.dev.sariska.io/api/v1/messaging' : 'https://api.sariska.io/api/v1/messaging';
// export const WEB_SOCKET_URL = process.env.NODE_ENV === 'development' ? 'ws://localhost:4000/api/v1/messaging/websocket' ?? "wss://api.dev.sariska.io/api/v1/messaging/websocket" :  "wss://api.sariska.io/api/v1/messaging/websocket";
// export const SARISKA_WEBSITE = 'https://sariska.io';
// export const SARISKA_COMPANY_NAME = 'Sariska.io';

/***/ }),

/***/ "./src/constants/index.js":
/*!********************************!*\
  !*** ./src/constants/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ANNOTATION_TOOLS: () => (/* binding */ ANNOTATION_TOOLS),
/* harmony export */   COMPANY_NAME: () => (/* binding */ COMPANY_NAME),
/* harmony export */   GENERATE_TOKEN_URL: () => (/* binding */ GENERATE_TOKEN_URL),
/* harmony export */   GET_PRESIGNED_URL: () => (/* binding */ GET_PRESIGNED_URL)
/* harmony export */ });
const GENERATE_TOKEN_URL = "".concat({"REACT_APP_SARISKA_MEET_APP_API_KEY":"27fd6f9e85c304447d3cc0fb31e7ba8062df58af86ac3f9437","REACT_APP_API_SERVICE_HOST":"https://api.sariska.io","REACT_APP_API_SERVICE_ORIGIN":"api.sariska.io","REACT_APP_WEBSOCKET_SERVICE_HOST":"wss://api.sariska.io","REACT_APP_API_SERVICE_HOST_NAME":"chat.sariska.io","REACT_APP_LOGO":"https://assets.sariska.io/Logo_Sariska.svg","REACT_APP_TITLE":"Sariska Chat App"}.REACT_APP_API_SERVICE_HOST, "/api/v1/misc/generate-token");
const COMPANY_NAME = 'Sariska';
const GET_PRESIGNED_URL = "".concat({"REACT_APP_SARISKA_MEET_APP_API_KEY":"27fd6f9e85c304447d3cc0fb31e7ba8062df58af86ac3f9437","REACT_APP_API_SERVICE_HOST":"https://api.sariska.io","REACT_APP_API_SERVICE_ORIGIN":"api.sariska.io","REACT_APP_WEBSOCKET_SERVICE_HOST":"wss://api.sariska.io","REACT_APP_API_SERVICE_HOST_NAME":"chat.sariska.io","REACT_APP_LOGO":"https://assets.sariska.io/Logo_Sariska.svg","REACT_APP_TITLE":"Sariska Chat App"}.REACT_APP_API_SERVICE_HOST, "/api/v1/misc/get-presigned");
const ANNOTATION_TOOLS = {
  pen: 'PEN',
  emoji: 'EMOJI',
  circle: 'CIRCLE',
  textbox: 'TEXTBOX'
};

/***/ }),

/***/ "./src/context/socket/SocketContext.js":
/*!*********************************************!*\
  !*** ./src/context/socket/SocketContext.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SocketContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocketContext);

/***/ }),

/***/ "./src/context/socket/SocketProvider.js":
/*!**********************************************!*\
  !*** ./src/context/socket/SocketProvider.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");
/* harmony import */ var phoenix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! phoenix */ "./node_modules/phoenix/priv/static/phoenix.mjs");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config */ "./src/config.js");
/* harmony import */ var _SocketContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SocketContext */ "./src/context/socket/SocketContext.js");





const SocketProvider = _ref => {
  let {
    children
  } = _ref;
  const [socket, setSocket] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  let userName = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getUserName)();
  let userId = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getUserId)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchData = async () => {
      const token = await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getToken)(userName, userId);
      const params = {
        token
      };
      const s = new phoenix__WEBPACK_IMPORTED_MODULE_2__.Socket(_config__WEBPACK_IMPORTED_MODULE_3__.WEB_SOCKET_URL, {
        params
      });
      s.onOpen(() => console.log('connection open!'));
      s.onError(e => console.log('There was an error with the connection!', e));
      s.onClose(() => {
        console.log('the connection dropped');
      });
      s.connect();
      setSocket(s);
    };
    fetchData();
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SocketContext__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
    value: socket
  }, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocketProvider);

/***/ }),

/***/ "./src/context/store/StoreContext.js":
/*!*******************************************!*\
  !*** ./src/context/store/StoreContext.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const StoreContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StoreContext);

/***/ }),

/***/ "./src/context/store/StoreProvider.js":
/*!********************************************!*\
  !*** ./src/context/store/StoreProvider.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoreProvider: () => (/* binding */ StoreProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_initialState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/initialState */ "./src/store/initialState/index.js");
/* harmony import */ var _store_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/reducer */ "./src/store/reducer/index.js");
/* harmony import */ var _StoreContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StoreContext */ "./src/context/store/StoreContext.js");




const StoreProvider = _ref => {
  let {
    children
  } = _ref;
  const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(_store_reducer__WEBPACK_IMPORTED_MODULE_2__.rootReducer, _store_initialState__WEBPACK_IMPORTED_MODULE_1__["default"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_StoreContext__WEBPACK_IMPORTED_MODULE_3__["default"].Provider, {
    value: {
      users: state.users,
      rooms: state.rooms,
      dispatch
    }
  }, children);
};

/***/ }),

/***/ "./src/hooks/UseEventHandler.js":
/*!**************************************!*\
  !*** ./src/hooks/UseEventHandler.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const UseEventHandler = (channel, event, setLoading, handler) => {
  const handle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(handler);
  handle.current = handler;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!channel) {
      return;
    }
    setLoading(true);
    const ref = channel.on("".concat(event), message => {
      handle.current(message);
      setLoading(false);
    });
    return () => {
      channel.off(event, ref);
      setLoading(false);
    };
  }, [channel, event]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UseEventHandler);

/***/ }),

/***/ "./src/hooks/useOnCircle.js":
/*!**********************************!*\
  !*** ./src/hooks/useOnCircle.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useOnCircle: () => (/* binding */ useOnCircle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");



function useOnCircle(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps) {
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const startPointRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const isDrawingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const [circles, setCircles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const mouseMoveListenerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const mouseUpListenerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _canvasRef$current;
    if (otherProps.annotationTools !== _constants__WEBPACK_IMPORTED_MODULE_2__.ANNOTATION_TOOLS.circle) {
      return;
    }
    const ctx = canvasRef === null || canvasRef === void 0 || (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.getContext('2d');
    const {
      parentCanvasRef,
      ...props
    } = otherProps;
    parentCanvasRef.current = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
    setCanvasCtx(ctx);
    function initMouseMoveListener() {
      const mouseMoveListener = e => {
        if (isDrawingRef.current) {
          const currentPoint = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.computePointInCanvas)(e.clientX, e.clientY, canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current);
          const startPoint = startPointRef.current;
          const radius = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.calculateCircleRadius)(startPoint, currentPoint);
          (0,_utils__WEBPACK_IMPORTED_MODULE_1__.redrawAnnotations)({
            ctx,
            annotations,
            props
          });
          (0,_utils__WEBPACK_IMPORTED_MODULE_1__.onDrawCircle)({
            ctx,
            center: startPoint,
            radius,
            props
          });
        }
      };
      mouseMoveListenerRef.current = mouseMoveListener;
      window.addEventListener('mousemove', mouseMoveListener);
    }
    function initMouseUpListener() {
      const mouseUpListener = event => {
        if (isDrawingRef.current) {
          const currentPoint = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.computePointInCanvas)(event.clientX, event.clientY, canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current);
          const startPoint = startPointRef.current;
          const radius = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.calculateCircleRadius)(startPoint, currentPoint);
          setCircles([...circles, {
            center: startPoint,
            radius
          }]);
          setAnnotations(annotations => [...annotations, {
            type: 'circle',
            ctx,
            center: startPoint,
            radius
          }]);
          pushMessage(JSON.stringify({
            ctx,
            center: startPoint,
            radius,
            props
          }), channel);
          isDrawingRef.current = false;
          startPointRef.current = null;
        }
      };
      mouseUpListenerRef.current = mouseUpListener;
      window.addEventListener('mouseup', mouseUpListener);
    }
    function removeMouseEventListeners() {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener('mousemove', mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener('mouseup', mouseUpListenerRef.current);
      }
    }
    if (otherProps.isParticipantAccess || otherProps.isModerator) {
      initMouseMoveListener();
      initMouseUpListener();
    }
    if (otherProps.isCanvasClear) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.clearCanvas)(ctx, otherProps.width, otherProps.height);
    }
    return () => {
      removeMouseEventListeners();
    };
  }, [_utils__WEBPACK_IMPORTED_MODULE_1__.onDrawCircle, channel, circles, otherProps.isCanvasClear, otherProps.isImageSaved, otherProps.lineColor, otherProps]);
  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
  }
  function onMouseDown(e) {
    if (!(canvasRef !== null && canvasRef !== void 0 && canvasRef.current)) return;
    isDrawingRef.current = true;
    const point = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.computePointInCanvas)(e.clientX, e.clientY, canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current);
    startPointRef.current = point; // Initialize the previous point with the current point
  }
  return {
    setCanvasRef,
    onMouseDown
  };
}

/***/ }),

/***/ "./src/hooks/useOnDraw.js":
/*!********************************!*\
  !*** ./src/hooks/useOnDraw.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useOnDraw: () => (/* binding */ useOnDraw)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");



function useOnDraw(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps) {
  const [annotation, setAnnotation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const prevPointRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const isDrawingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const mouseMoveListenerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const mouseUpListenerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

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

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _canvasRef$current;
    if (otherProps.annotationTools !== _constants__WEBPACK_IMPORTED_MODULE_2__.ANNOTATION_TOOLS.pen) {
      return;
    }
    const ctx = canvasRef === null || canvasRef === void 0 || (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.getContext('2d');
    const {
      parentCanvasRef,
      ...props
    } = otherProps;
    parentCanvasRef.current = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
    console.log('draw ctx', ctx, canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current, props);
    setCanvasCtx(ctx);
    function initMouseMoveListener() {
      const mouseMoveListener = e => {
        if (isDrawingRef.current) {
          const point = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.computePointInCanvas)(e.clientX, e.clientY, canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current);
          let prevPoint = prevPointRef.current;
          console.log('mouseMoveListener');
          if (_utils__WEBPACK_IMPORTED_MODULE_1__.onDraw) {
            console.log('ondmouseMoveListener');
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.onDraw)({
              ctx,
              point,
              prevPoint,
              props
            });
            setAnnotation(annotation => [...annotation, {
              ctx,
              point,
              prevPoint,
              props
            }]);
            setAnnotations(annotations => [...annotations, {
              type: 'pen',
              ctx,
              point,
              prevPoint,
              props
            }]);
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.redrawAnnotations)({
              ctx,
              annotations,
              props
            });
          }
          if (channel) {
            pushMessage(JSON.stringify({
              ctx,
              point,
              prevPoint,
              props
            }), channel);
          }
          prevPointRef.current = point;
        }
      };
      mouseMoveListenerRef.current = mouseMoveListener;
      window.addEventListener("mousemove", mouseMoveListener);
    }
    function initMouseUpListener() {
      const mouseUpListener = () => {
        isDrawingRef.current = false;
        prevPointRef.current = null;
      };
      mouseUpListenerRef.current = mouseUpListener;
      window.addEventListener('mouseup', mouseUpListener);
    }
    function removeMouseEventListeners() {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener('mousemove', mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener('mouseup', mouseUpListenerRef.current);
      }
    }
    if (props.isParticipantAccess) {
      initMouseMoveListener();
      initMouseUpListener();
    } else {
      if (props.isModerator) {
        initMouseMoveListener();
        initMouseUpListener();
      }
    }
    if (props.isCanvasClear) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.clearCanvas)(ctx, props.width, props.height);
    }
    if (props.isImageSaved) {
      props.saveImage(annotation);
    }
    return () => {
      if (props.isParticipantAccess) {
        removeMouseEventListeners();
      } else {
        if (props.isModerator) {
          removeMouseEventListeners();
        }
      }
    };
  }, [_utils__WEBPACK_IMPORTED_MODULE_1__.onDraw, channel,
  //   otherProps.isCanvasClear,
  //  otherProps.isImageSaved,
  //  otherProps.lineColor,
  otherProps]);
  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
  }
  function onMouseDown(e) {
    var _canvasRef$current2;
    if (!(canvasRef !== null && canvasRef !== void 0 && canvasRef.current)) return;
    const {
      parentCanvasRef,
      ...props
    } = otherProps;
    isDrawingRef.current = true;
    const ctx = canvasRef === null || canvasRef === void 0 || (_canvasRef$current2 = canvasRef.current) === null || _canvasRef$current2 === void 0 ? void 0 : _canvasRef$current2.getContext('2d');
    const point = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.computePointInCanvas)(e.clientX, e.clientY, canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current);
    let prevPoint = prevPointRef.current;
    setAnnotation(annotation => [...annotation, {
      ctx,
      point,
      prevPoint,
      props
    }]);
    setAnnotations(annotations => [...annotations, {
      type: 'pen',
      ctx,
      point,
      prevPoint,
      props
    }]);
    console.log('setAnnotations draw', ctx, point, prevPoint, props);
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.onDraw)({
      ctx,
      point,
      prevPoint,
      props
    });
    if (channel) {
      pushMessage(JSON.stringify({
        ctx,
        point,
        prevPoint,
        props
      }), channel);
    }
  }
  return {
    setCanvasRef,
    onMouseDown
  };
}

/***/ }),

/***/ "./src/hooks/useOnEmoji.js":
/*!*********************************!*\
  !*** ./src/hooks/useOnEmoji.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useOnEmoji: () => (/* binding */ useOnEmoji)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");

 // Assume these utils are predefined

function useOnEmoji(pushMessage, channel, setCanvasCtx, annotations, setAnnotations, otherProps) {
  const [emojis, setEmojis] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const setCanvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(ref => {
    if (otherProps.annotationTools !== _constants__WEBPACK_IMPORTED_MODULE_2__.ANNOTATION_TOOLS.emoji) {
      return;
    }
    if (!ref) return;
    canvasRef.current = ref;
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (otherProps.annotationTools !== _constants__WEBPACK_IMPORTED_MODULE_2__.ANNOTATION_TOOLS.emoji) {
      return;
    }
    const canvas = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const {
        parentCanvasRef,
        isCanvasClear,
        width,
        height
      } = otherProps;
      parentCanvasRef.current = canvas;
      setCanvasCtx(prevCtx => {
        if (prevCtx !== ctx) {
          return ctx;
        }
        return prevCtx;
      });
      if ((annotations === null || annotations === void 0 ? void 0 : annotations.length) !== 0) {
        setAnnotations([...annotations]);
      }
      console.log('emoji ctx', otherProps);
      if (isCanvasClear) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.clearCanvas)(ctx, width, height);
      }
    }
  }, [canvasRef, channel, otherProps,
  //  isCanvasClear,
  setCanvasCtx, annotations === null || annotations === void 0 ? void 0 : annotations.length]);
  const onMouseDown = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(event => {
    var _canvasRef$current;
    if (otherProps.annotationTools !== _constants__WEBPACK_IMPORTED_MODULE_2__.ANNOTATION_TOOLS.emoji) {
      return;
    }
    if (!otherProps.isModerator) {
      return;
    }
    let emojiType = '😎';
    const ctx = canvasRef === null || canvasRef === void 0 || (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.getContext('2d');
    const {
      parentCanvasRef,
      ...props
    } = otherProps;
    const point = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.computePointInCanvas)(event.clientX, event.clientY, canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current);
    setEmojis(prevEmojis => [...prevEmojis, {
      ctx,
      point,
      emoji: props.emojiType
    }]);
    setAnnotations(annotations => [...annotations, {
      type: 'emoji',
      ctx,
      point,
      emoji: props.emojiType,
      emojis: [...emojis, {
        ctx,
        point,
        emoji: props.emojiType
      }]
    }]);

    // Draw the emoji on the canvas
    // ctx.font = '24px Arial';
    // ctx.textBaseline = 'middle';
    // ctx.textAlign = 'center';
    // ctx.clearRect(0, 0, ctx.width, ctx.height);
    // emojis.forEach(({ x, y }) => {
    //   ctx.fillText(props.emojiType || '😀', x, y);
    // });

    // ctx.fillText(props.emojiType || '😀', point.x, point.y); // Draw the latest emoji
    console.log('onmousedown emoji', ctx, props);
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.redrawAnnotations)({
      ctx,
      annotations,
      props
    });
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.onDrawEmoji)({
      ctx,
      point,
      emoji: props.emojiType
    });
    if (channel) {
      pushMessage(JSON.stringify({
        ctx,
        point,
        emoji: props.emojiType
      }), channel);
    }
  }, [emojis === null || emojis === void 0 ? void 0 : emojis.length, channel]);

  // function onMouseDown(e) {
  //     if (!canvasRef.current) return;
  //     console.log('onMouseDown')
  //     const { parentCanvasRef, ...props } = otherProps;
  //     const ctx = canvasRef.current.getContext('2d');
  //     const point = computePointInCanvas(e.clientX, e.clientY, canvasRef.current);

  //     // Add emoji to state
  //     setEmojis((prevEmojis) => [...prevEmojis, { point, emoji: props.emojiType }]);

  //     // Draw the emoji on the canvas
  //     ctx.font = '24px Arial';
  //     ctx.textBaseline = 'middle';
  //     ctx.textAlign = 'center';
  //     ctx.fillText(props.emojiType || '😀', point.x, point.y);

  //     // Push the emoji placement to the channel
  //     if (channel) {
  //         pushMessage(JSON.stringify({ point, emoji: props.emojiType }), channel);
  //     }
  // }

  return {
    setCanvasRef,
    onMouseDown
  };
}

/***/ }),

/***/ "./src/store/action/room.js":
/*!**********************************!*\
  !*** ./src/store/action/room.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRoom: () => (/* binding */ getRoom),
/* harmony export */   setRoom: () => (/* binding */ setRoom)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");

const setRoom = (type, payload) => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.renderAction)(type, payload);
const getRoom = (type, payload) => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.renderAction)(type, payload);

/***/ }),

/***/ "./src/store/action/types.js":
/*!***********************************!*\
  !*** ./src/store/action/types.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET_ROOM: () => (/* binding */ GET_ROOM),
/* harmony export */   GET_USER: () => (/* binding */ GET_USER),
/* harmony export */   SET_ROOM: () => (/* binding */ SET_ROOM),
/* harmony export */   SET_USER: () => (/* binding */ SET_USER)
/* harmony export */ });
const SET_ROOM = 'SET_ROOM';
const GET_ROOM = 'GET_ROOM';
const SET_USER = 'SET_USER';
const GET_USER = 'GET_USER';

/***/ }),

/***/ "./src/store/action/user.js":
/*!**********************************!*\
  !*** ./src/store/action/user.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUser: () => (/* binding */ getUser),
/* harmony export */   setUser: () => (/* binding */ setUser)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");

const setUser = (type, payload) => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.renderAction)(type, payload);
const getUser = type => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.renderAction)(type);

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_store_StoreContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/store/StoreContext */ "./src/context/store/StoreContext.js");


const useStore = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_store_StoreContext__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./src/store/initialState/index.js":
/*!*****************************************!*\
  !*** ./src/store/initialState/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reducer_room__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reducer/room */ "./src/store/reducer/room.js");
/* harmony import */ var _reducer_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducer/user */ "./src/store/reducer/user.js");


const initialContextState = {
  rooms: _reducer_room__WEBPACK_IMPORTED_MODULE_0__.initialState,
  users: _reducer_user__WEBPACK_IMPORTED_MODULE_1__.initialState
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initialContextState);

/***/ }),

/***/ "./src/store/reducer/index.js":
/*!************************************!*\
  !*** ./src/store/reducer/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rootReducer: () => (/* binding */ rootReducer)
/* harmony export */ });
/* harmony import */ var _room__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./room */ "./src/store/reducer/room.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ "./src/store/reducer/user.js");


const rootReducer = (_ref, action) => {
  let {
    room,
    user
  } = _ref;
  return {
    rooms: (0,_room__WEBPACK_IMPORTED_MODULE_0__.room)(room, action),
    users: (0,_user__WEBPACK_IMPORTED_MODULE_1__.user)(user, action)
  };
};

/***/ }),

/***/ "./src/store/reducer/room.js":
/*!***********************************!*\
  !*** ./src/store/reducer/room.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initialState: () => (/* binding */ initialState),
/* harmony export */   room: () => (/* binding */ room)
/* harmony export */ });
/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../action/types */ "./src/store/action/types.js");

const initialState = {
  room: JSON.parse(localStorage.getItem('sariska-collaborative-room')) || {}
};
const room = function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _action_types__WEBPACK_IMPORTED_MODULE_0__.SET_ROOM:
      localStorage.setItem("sariska-collaborative-room", JSON.stringify(action.payload));
      state.room = action.payload;
      return {
        ...state
      };
    case _action_types__WEBPACK_IMPORTED_MODULE_0__.GET_ROOM:
      return {
        ...state.room
      };
    default:
      return {
        ...state
      };
  }
};

/***/ }),

/***/ "./src/store/reducer/user.js":
/*!***********************************!*\
  !*** ./src/store/reducer/user.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initialState: () => (/* binding */ initialState),
/* harmony export */   user: () => (/* binding */ user)
/* harmony export */ });
/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../action/types */ "./src/store/action/types.js");

const initialState = {
  user: JSON.parse(localStorage.getItem('sariska-collaborative-user')) || {}
};
const user = function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _action_types__WEBPACK_IMPORTED_MODULE_0__.SET_USER:
      localStorage.setItem("sariska-collaborative-user", JSON.stringify(action.payload));
      state.user = action.payload;
      return {
        ...state
      };
    case _action_types__WEBPACK_IMPORTED_MODULE_0__.GET_USER:
      return state.user;
    default:
      return {
        ...state
      };
  }
};

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateCircleRadius: () => (/* binding */ calculateCircleRadius),
/* harmony export */   clearCanvas: () => (/* binding */ clearCanvas),
/* harmony export */   computePointInCanvas: () => (/* binding */ computePointInCanvas),
/* harmony export */   drawLine: () => (/* binding */ drawLine),
/* harmony export */   getAllRemoteTextBoxes: () => (/* binding */ getAllRemoteTextBoxes),
/* harmony export */   getRoomId: () => (/* binding */ getRoomId),
/* harmony export */   getRoomName: () => (/* binding */ getRoomName),
/* harmony export */   getToken: () => (/* binding */ getToken),
/* harmony export */   getUserId: () => (/* binding */ getUserId),
/* harmony export */   getUserName: () => (/* binding */ getUserName),
/* harmony export */   measureText: () => (/* binding */ measureText),
/* harmony export */   onDraw: () => (/* binding */ onDraw),
/* harmony export */   onDrawCircle: () => (/* binding */ onDrawCircle),
/* harmony export */   onDrawEmoji: () => (/* binding */ onDrawEmoji),
/* harmony export */   redrawAnnotations: () => (/* binding */ redrawAnnotations),
/* harmony export */   renderAction: () => (/* binding */ renderAction),
/* harmony export */   setAllRemoteTextBoxes: () => (/* binding */ setAllRemoteTextBoxes)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");


function getUserId() {
  let storedUserId = JSON.parse(localStorage.getItem('sariska-collaborative-userId'));
  if (storedUserId) {
    return storedUserId;
  }
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  let userId = generateString(12).trim();
  localStorage.setItem('sariska-collaborative-userId', JSON.stringify(userId));
  return userId;
}
function getUserName() {
  let storedUserName = JSON.parse(localStorage.getItem('sariska-collaborative-userName'));
  if (storedUserName) {
    return storedUserName;
  }
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const str = generateString(8).trim();
  const strArr = str.match(/.{4}/g);
  const userName = strArr.join("_");
  localStorage.setItem('sariska-collaborative-userName', JSON.stringify(userName));
  return userName;
}
function getRoomId() {
  let storedRoomId = JSON.parse(localStorage.getItem('sariska-collaborative-roomId'));
  if (storedRoomId) {
    return storedRoomId;
  }
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const roomId = generateString(9).trim();
  localStorage.setItem('sariska-collaborative-roomId', JSON.stringify(roomId));
  return roomId;
}
function getRoomName() {
  let storedRoomName = JSON.parse(localStorage.getItem('sariska-collaborative-roomName'));
  if (storedRoomName) {
    return storedRoomName;
  }
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const str = generateString(9).trim();
  const strArr = str.match(/.{3}/g);
  const roomName = strArr.join("-");
  localStorage.setItem('sariska-collaborative-roomName', JSON.stringify(roomName));
  return roomName;
}
const getToken = async (username, userId) => {
  const body = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      apiKey: "".concat(_config__WEBPACK_IMPORTED_MODULE_0__.SARISKA_API_KEY),
      // enter your app secret,
      user: {
        id: userId,
        name: username
      }
    })
  };
  try {
    const response = await fetch(_constants__WEBPACK_IMPORTED_MODULE_1__.GENERATE_TOKEN_URL, body);
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
};
const renderAction = (type, payload) => {
  if (payload) {
    return {
      type,
      payload
    };
  } else {
    return {
      type
    };
  }
};
function clearCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
}
function drawLine(ctx, end, start, color, width) {
  var _start, _start2, _start3, _start4, _start5;
  if (!ctx) return;
  console.log('drawLine', ctx, end, start, color, width);
  start = (_start = start) !== null && _start !== void 0 ? _start : end;
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.moveTo((_start2 = start) === null || _start2 === void 0 ? void 0 : _start2.x, (_start3 = start) === null || _start3 === void 0 ? void 0 : _start3.y);
  ctx.lineTo(end === null || end === void 0 ? void 0 : end.x, end === null || end === void 0 ? void 0 : end.y);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc((_start4 = start) === null || _start4 === void 0 ? void 0 : _start4.x, (_start5 = start) === null || _start5 === void 0 ? void 0 : _start5.y, 2, 0, 2 * Math.PI);
  ctx.fill();
}
function onDraw(data) {
  var _data$props, _data$props2;
  drawLine(data.ctx, data.point, data.prevPoint, data === null || data === void 0 || (_data$props = data.props) === null || _data$props === void 0 ? void 0 : _data$props.lineColor, data === null || data === void 0 || (_data$props2 = data.props) === null || _data$props2 === void 0 ? void 0 : _data$props2.lineWidth);
}
function onDrawEmoji(_ref) {
  let {
    ctx,
    point,
    emoji,
    emojis
  } = _ref;
  if (!ctx) return;
  ctx.font = '24px Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'red';
  if (emojis !== null && emojis !== void 0 && emojis.length) {
    emojis.forEach(_ref2 => {
      let {
        x,
        y
      } = _ref2;
      ctx.fillText(emoji || '😀', x, y);
    });
  }
  ctx.fillText(emoji || '😀', point === null || point === void 0 ? void 0 : point.x, point === null || point === void 0 ? void 0 : point.y); // Draw the latest emoji
}
function onDrawCircle(_ref3) {
  let {
    ctx,
    center,
    radius,
    props
  } = _ref3;
  if (!ctx) return;
  if (center) {
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = props === null || props === void 0 ? void 0 : props.lineColor;
    ctx.lineWidth = props === null || props === void 0 ? void 0 : props.lineWidth;
    ctx.stroke();
  }
}
;
const redrawAnnotations = _ref4 => {
  let {
    ctx,
    annotations,
    props
  } = _ref4;
  console.log('b4redrawAnnotations', props, annotations);
  if (!ctx) return;
  console.log('afredrawAnnotations');
  if (props.annotationTools !== _constants__WEBPACK_IMPORTED_MODULE_1__.ANNOTATION_TOOLS.emoji) {
    console.log('first ANNOTATION_TOOLS.emoji', props.annotationTools !== _constants__WEBPACK_IMPORTED_MODULE_1__.ANNOTATION_TOOLS.emoji, props.annotationTools, _constants__WEBPACK_IMPORTED_MODULE_1__.ANNOTATION_TOOLS.emoji);
    clearCanvas(ctx, props.width, props.height);
  }
  console.log('clear canvas');
  annotations === null || annotations === void 0 || annotations.forEach(annotation => {
    const {
      type,
      ...params
    } = annotation;
    if (type === 'pen') {
      console.log('redrawAnnotations pen', params);
      onDraw(params);
    } else if (type === 'emoji') {
      console.log('redrawAnnotations emoji', params);
      onDrawEmoji(params);
    } else {
      onDrawCircle({
        ctx,
        center: annotation.center,
        radius: annotation.radius,
        props
      });
    }
  });
  // circles.forEach(({ center, radius }) => {
  //     onDrawCircle({ctx, center, radius, props});
  // });
};
function computePointInCanvas(clientX, clientY, refCurrent) {
  if (refCurrent) {
    const boundingRect = refCurrent.getBoundingClientRect();
    return {
      x: clientX - boundingRect.left,
      y: clientY - boundingRect.top
    };
  } else {
    return null;
  }
}
const calculateCircleRadius = (startPos, currentPos) => {
  return Math.sqrt(Math.pow(currentPos.x - startPos.x, 2) + Math.pow(currentPos.y - startPos.y, 2));
};
const measureText = (text, maxWidth, canvasRef) => {
  var _canvasRef$current;
  const ctx = canvasRef === null || canvasRef === void 0 || (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.getContext('2d');
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
    height: height
  };
};
const getAllRemoteTextBoxes = (remoteTextboxes, textbox) => {
  let allRemoteTextBoxes = remoteTextboxes === null || remoteTextboxes === void 0 ? void 0 : remoteTextboxes.map(remoteTextbox => {
    if (remoteTextbox.id === textbox.id) {
      return {
        ...textbox
      };
    } else {
      return {
        ...remoteTextbox
      };
    }
  });
  if (!(allRemoteTextBoxes !== null && allRemoteTextBoxes !== void 0 && allRemoteTextBoxes.some(remoteTextbox => remoteTextbox.id === textbox.id))) {
    allRemoteTextBoxes.push(textbox);
  }
  return allRemoteTextBoxes;
};
const setAllRemoteTextBoxes = (content, remoteTextboxes, setRemoteTextboxes) => {
  if (content !== null && content !== void 0 && content.textbox) {
    const {
      textbox
    } = content;
    if (remoteTextboxes !== null && remoteTextboxes !== void 0 && remoteTextboxes.length) {
      let allRemoteTextBoxes = getAllRemoteTextBoxes(remoteTextboxes, textbox);
      setRemoteTextboxes(allRemoteTextBoxes);
    } else {
      setRemoteTextboxes([{
        ...textbox
      }]);
    }
  }
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/App.css":
/*!***********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/App.css ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`, "",{"version":3,"sources":["webpack://./src/App.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,oBAAoB;AACtB;;AAEA;EACE;IACE,4CAA4C;EAC9C;AACF;;AAEA;EACE,yBAAyB;EACzB,iBAAiB;EACjB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,6BAA6B;EAC7B,YAAY;AACd;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE;IACE,uBAAuB;EACzB;EACA;IACE,yBAAyB;EAC3B;AACF","sourcesContent":[".App {\n  text-align: center;\n}\n\n.App-logo {\n  height: 40vmin;\n  pointer-events: none;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  .App-logo {\n    animation: App-logo-spin infinite 20s linear;\n  }\n}\n\n.App-header {\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n}\n\n.App-link {\n  color: #61dafb;\n}\n\n@keyframes App-logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

iframe[style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; border: none; z-index: 2147483647;"] {
  pointer-events: none;
}`, "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT;;cAEY;EACZ,mCAAmC;EACnC,kCAAkC;AACpC;;AAEA;EACE;aACW;AACb;;AAEA;EACE,oBAAoB;AACtB","sourcesContent":["body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n\niframe[style=\"position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; border: none; z-index: 2147483647;\"] {\n  pointer-events: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./App.css */ "./node_modules/css-loader/dist/cjs.js!./src/App.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"React","root":"React"} ***!
  \**************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "./node_modules/phoenix/priv/static/phoenix.mjs":
/*!******************************************************!*\
  !*** ./node_modules/phoenix/priv/static/phoenix.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Channel: () => (/* binding */ Channel),
/* harmony export */   LongPoll: () => (/* binding */ LongPoll),
/* harmony export */   Presence: () => (/* binding */ Presence),
/* harmony export */   Serializer: () => (/* binding */ serializer_default),
/* harmony export */   Socket: () => (/* binding */ Socket)
/* harmony export */ });
// js/phoenix/utils.js
var closure = (value) => {
  if (typeof value === "function") {
    return value;
  } else {
    let closure2 = function() {
      return value;
    };
    return closure2;
  }
};

// js/phoenix/constants.js
var globalSelf = typeof self !== "undefined" ? self : null;
var phxWindow = typeof window !== "undefined" ? window : null;
var global = globalSelf || phxWindow || global;
var DEFAULT_VSN = "2.0.0";
var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
var DEFAULT_TIMEOUT = 1e4;
var WS_CLOSE_NORMAL = 1e3;
var CHANNEL_STATES = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving"
};
var CHANNEL_EVENTS = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
};
var TRANSPORTS = {
  longpoll: "longpoll",
  websocket: "websocket"
};
var XHR_STATES = {
  complete: 4
};

// js/phoenix/push.js
var Push = class {
  constructor(channel, event, payload, timeout) {
    this.channel = channel;
    this.event = event;
    this.payload = payload || function() {
      return {};
    };
    this.receivedResp = null;
    this.timeout = timeout;
    this.timeoutTimer = null;
    this.recHooks = [];
    this.sent = false;
  }
  /**
   *
   * @param {number} timeout
   */
  resend(timeout) {
    this.timeout = timeout;
    this.reset();
    this.send();
  }
  /**
   *
   */
  send() {
    if (this.hasReceived("timeout")) {
      return;
    }
    this.startTimeout();
    this.sent = true;
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload(),
      ref: this.ref,
      join_ref: this.channel.joinRef()
    });
  }
  /**
   *
   * @param {*} status
   * @param {*} callback
   */
  receive(status, callback) {
    if (this.hasReceived(status)) {
      callback(this.receivedResp.response);
    }
    this.recHooks.push({ status, callback });
    return this;
  }
  /**
   * @private
   */
  reset() {
    this.cancelRefEvent();
    this.ref = null;
    this.refEvent = null;
    this.receivedResp = null;
    this.sent = false;
  }
  /**
   * @private
   */
  matchReceive({ status, response, _ref }) {
    this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
  }
  /**
   * @private
   */
  cancelRefEvent() {
    if (!this.refEvent) {
      return;
    }
    this.channel.off(this.refEvent);
  }
  /**
   * @private
   */
  cancelTimeout() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = null;
  }
  /**
   * @private
   */
  startTimeout() {
    if (this.timeoutTimer) {
      this.cancelTimeout();
    }
    this.ref = this.channel.socket.makeRef();
    this.refEvent = this.channel.replyEventName(this.ref);
    this.channel.on(this.refEvent, (payload) => {
      this.cancelRefEvent();
      this.cancelTimeout();
      this.receivedResp = payload;
      this.matchReceive(payload);
    });
    this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  /**
   * @private
   */
  hasReceived(status) {
    return this.receivedResp && this.receivedResp.status === status;
  }
  /**
   * @private
   */
  trigger(status, response) {
    this.channel.trigger(this.refEvent, { status, response });
  }
};

// js/phoenix/timer.js
var Timer = class {
  constructor(callback, timerCalc) {
    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = null;
    this.tries = 0;
  }
  reset() {
    this.tries = 0;
    clearTimeout(this.timer);
  }
  /**
   * Cancels any previous scheduleTimeout and schedules callback
   */
  scheduleTimeout() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.tries = this.tries + 1;
      this.callback();
    }, this.timerCalc(this.tries + 1));
  }
};

// js/phoenix/channel.js
var Channel = class {
  constructor(topic, params, socket) {
    this.state = CHANNEL_STATES.closed;
    this.topic = topic;
    this.params = closure(params || {});
    this.socket = socket;
    this.bindings = [];
    this.bindingRef = 0;
    this.timeout = this.socket.timeout;
    this.joinedOnce = false;
    this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
    this.pushBuffer = [];
    this.stateChangeRefs = [];
    this.rejoinTimer = new Timer(() => {
      if (this.socket.isConnected()) {
        this.rejoin();
      }
    }, this.socket.rejoinAfterMs);
    this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
    this.stateChangeRefs.push(
      this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      })
    );
    this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined;
      this.rejoinTimer.reset();
      this.pushBuffer.forEach((pushEvent) => pushEvent.send());
      this.pushBuffer = [];
    });
    this.joinPush.receive("error", () => {
      this.state = CHANNEL_STATES.errored;
      if (this.socket.isConnected()) {
        this.rejoinTimer.scheduleTimeout();
      }
    });
    this.onClose(() => {
      this.rejoinTimer.reset();
      if (this.socket.hasLogger())
        this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
      this.state = CHANNEL_STATES.closed;
      this.socket.remove(this);
    });
    this.onError((reason) => {
      if (this.socket.hasLogger())
        this.socket.log("channel", `error ${this.topic}`, reason);
      if (this.isJoining()) {
        this.joinPush.reset();
      }
      this.state = CHANNEL_STATES.errored;
      if (this.socket.isConnected()) {
        this.rejoinTimer.scheduleTimeout();
      }
    });
    this.joinPush.receive("timeout", () => {
      if (this.socket.hasLogger())
        this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
      leavePush.send();
      this.state = CHANNEL_STATES.errored;
      this.joinPush.reset();
      if (this.socket.isConnected()) {
        this.rejoinTimer.scheduleTimeout();
      }
    });
    this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
      this.trigger(this.replyEventName(ref), payload);
    });
  }
  /**
   * Join the channel
   * @param {integer} timeout
   * @returns {Push}
   */
  join(timeout = this.timeout) {
    if (this.joinedOnce) {
      throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
    } else {
      this.timeout = timeout;
      this.joinedOnce = true;
      this.rejoin();
      return this.joinPush;
    }
  }
  /**
   * Hook into channel close
   * @param {Function} callback
   */
  onClose(callback) {
    this.on(CHANNEL_EVENTS.close, callback);
  }
  /**
   * Hook into channel errors
   * @param {Function} callback
   */
  onError(callback) {
    return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
  }
  /**
   * Subscribes on channel events
   *
   * Subscription returns a ref counter, which can be used later to
   * unsubscribe the exact event listener
   *
   * @example
   * const ref1 = channel.on("event", do_stuff)
   * const ref2 = channel.on("event", do_other_stuff)
   * channel.off("event", ref1)
   * // Since unsubscription, do_stuff won't fire,
   * // while do_other_stuff will keep firing on the "event"
   *
   * @param {string} event
   * @param {Function} callback
   * @returns {integer} ref
   */
  on(event, callback) {
    let ref = this.bindingRef++;
    this.bindings.push({ event, ref, callback });
    return ref;
  }
  /**
   * Unsubscribes off of channel events
   *
   * Use the ref returned from a channel.on() to unsubscribe one
   * handler, or pass nothing for the ref to unsubscribe all
   * handlers for the given event.
   *
   * @example
   * // Unsubscribe the do_stuff handler
   * const ref1 = channel.on("event", do_stuff)
   * channel.off("event", ref1)
   *
   * // Unsubscribe all handlers from event
   * channel.off("event")
   *
   * @param {string} event
   * @param {integer} ref
   */
  off(event, ref) {
    this.bindings = this.bindings.filter((bind) => {
      return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
    });
  }
  /**
   * @private
   */
  canPush() {
    return this.socket.isConnected() && this.isJoined();
  }
  /**
   * Sends a message `event` to phoenix with the payload `payload`.
   * Phoenix receives this in the `handle_in(event, payload, socket)`
   * function. if phoenix replies or it times out (default 10000ms),
   * then optionally the reply can be received.
   *
   * @example
   * channel.push("event")
   *   .receive("ok", payload => console.log("phoenix replied:", payload))
   *   .receive("error", err => console.log("phoenix errored", err))
   *   .receive("timeout", () => console.log("timed out pushing"))
   * @param {string} event
   * @param {Object} payload
   * @param {number} [timeout]
   * @returns {Push}
   */
  push(event, payload, timeout = this.timeout) {
    payload = payload || {};
    if (!this.joinedOnce) {
      throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
    }
    let pushEvent = new Push(this, event, function() {
      return payload;
    }, timeout);
    if (this.canPush()) {
      pushEvent.send();
    } else {
      pushEvent.startTimeout();
      this.pushBuffer.push(pushEvent);
    }
    return pushEvent;
  }
  /** Leaves the channel
   *
   * Unsubscribes from server events, and
   * instructs channel to terminate on server
   *
   * Triggers onClose() hooks
   *
   * To receive leave acknowledgements, use the `receive`
   * hook to bind to the server ack, ie:
   *
   * @example
   * channel.leave().receive("ok", () => alert("left!") )
   *
   * @param {integer} timeout
   * @returns {Push}
   */
  leave(timeout = this.timeout) {
    this.rejoinTimer.reset();
    this.joinPush.cancelTimeout();
    this.state = CHANNEL_STATES.leaving;
    let onClose = () => {
      if (this.socket.hasLogger())
        this.socket.log("channel", `leave ${this.topic}`);
      this.trigger(CHANNEL_EVENTS.close, "leave");
    };
    let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
    leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
    leavePush.send();
    if (!this.canPush()) {
      leavePush.trigger("ok", {});
    }
    return leavePush;
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling
   * before dispatching to the channel callbacks.
   *
   * Must return the payload, modified or unmodified
   * @param {string} event
   * @param {Object} payload
   * @param {integer} ref
   * @returns {Object}
   */
  onMessage(_event, payload, _ref) {
    return payload;
  }
  /**
   * @private
   */
  isMember(topic, event, payload, joinRef) {
    if (this.topic !== topic) {
      return false;
    }
    if (joinRef && joinRef !== this.joinRef()) {
      if (this.socket.hasLogger())
        this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
      return false;
    } else {
      return true;
    }
  }
  /**
   * @private
   */
  joinRef() {
    return this.joinPush.ref;
  }
  /**
   * @private
   */
  rejoin(timeout = this.timeout) {
    if (this.isLeaving()) {
      return;
    }
    this.socket.leaveOpenTopic(this.topic);
    this.state = CHANNEL_STATES.joining;
    this.joinPush.resend(timeout);
  }
  /**
   * @private
   */
  trigger(event, payload, ref, joinRef) {
    let handledPayload = this.onMessage(event, payload, ref, joinRef);
    if (payload && !handledPayload) {
      throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
    }
    let eventBindings = this.bindings.filter((bind) => bind.event === event);
    for (let i = 0; i < eventBindings.length; i++) {
      let bind = eventBindings[i];
      bind.callback(handledPayload, ref, joinRef || this.joinRef());
    }
  }
  /**
   * @private
   */
  replyEventName(ref) {
    return `chan_reply_${ref}`;
  }
  /**
   * @private
   */
  isClosed() {
    return this.state === CHANNEL_STATES.closed;
  }
  /**
   * @private
   */
  isErrored() {
    return this.state === CHANNEL_STATES.errored;
  }
  /**
   * @private
   */
  isJoined() {
    return this.state === CHANNEL_STATES.joined;
  }
  /**
   * @private
   */
  isJoining() {
    return this.state === CHANNEL_STATES.joining;
  }
  /**
   * @private
   */
  isLeaving() {
    return this.state === CHANNEL_STATES.leaving;
  }
};

// js/phoenix/ajax.js
var Ajax = class {
  static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
    if (global.XDomainRequest) {
      let req = new global.XDomainRequest();
      return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
    } else {
      let req = new global.XMLHttpRequest();
      return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
    }
  }
  static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
    req.timeout = timeout;
    req.open(method, endPoint);
    req.onload = () => {
      let response = this.parseJSON(req.responseText);
      callback && callback(response);
    };
    if (ontimeout) {
      req.ontimeout = ontimeout;
    }
    req.onprogress = () => {
    };
    req.send(body);
    return req;
  }
  static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
    req.open(method, endPoint, true);
    req.timeout = timeout;
    req.setRequestHeader("Content-Type", accept);
    req.onerror = () => callback && callback(null);
    req.onreadystatechange = () => {
      if (req.readyState === XHR_STATES.complete && callback) {
        let response = this.parseJSON(req.responseText);
        callback(response);
      }
    };
    if (ontimeout) {
      req.ontimeout = ontimeout;
    }
    req.send(body);
    return req;
  }
  static parseJSON(resp) {
    if (!resp || resp === "") {
      return null;
    }
    try {
      return JSON.parse(resp);
    } catch (e) {
      console && console.log("failed to parse JSON response", resp);
      return null;
    }
  }
  static serialize(obj, parentKey) {
    let queryStr = [];
    for (var key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        continue;
      }
      let paramKey = parentKey ? `${parentKey}[${key}]` : key;
      let paramVal = obj[key];
      if (typeof paramVal === "object") {
        queryStr.push(this.serialize(paramVal, paramKey));
      } else {
        queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
      }
    }
    return queryStr.join("&");
  }
  static appendParams(url, params) {
    if (Object.keys(params).length === 0) {
      return url;
    }
    let prefix = url.match(/\?/) ? "&" : "?";
    return `${url}${prefix}${this.serialize(params)}`;
  }
};

// js/phoenix/longpoll.js
var arrayBufferToBase64 = (buffer) => {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};
var LongPoll = class {
  constructor(endPoint) {
    this.endPoint = null;
    this.token = null;
    this.skipHeartbeat = true;
    this.reqs = /* @__PURE__ */ new Set();
    this.awaitingBatchAck = false;
    this.currentBatch = null;
    this.currentBatchTimer = null;
    this.batchBuffer = [];
    this.onopen = function() {
    };
    this.onerror = function() {
    };
    this.onmessage = function() {
    };
    this.onclose = function() {
    };
    this.pollEndpoint = this.normalizeEndpoint(endPoint);
    this.readyState = SOCKET_STATES.connecting;
    setTimeout(() => this.poll(), 0);
  }
  normalizeEndpoint(endPoint) {
    return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
  }
  endpointURL() {
    return Ajax.appendParams(this.pollEndpoint, { token: this.token });
  }
  closeAndRetry(code, reason, wasClean) {
    this.close(code, reason, wasClean);
    this.readyState = SOCKET_STATES.connecting;
  }
  ontimeout() {
    this.onerror("timeout");
    this.closeAndRetry(1005, "timeout", false);
  }
  isActive() {
    return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
  }
  poll() {
    this.ajax("GET", "application/json", null, () => this.ontimeout(), (resp) => {
      if (resp) {
        var { status, token, messages } = resp;
        this.token = token;
      } else {
        status = 0;
      }
      switch (status) {
        case 200:
          messages.forEach((msg) => {
            setTimeout(() => this.onmessage({ data: msg }), 0);
          });
          this.poll();
          break;
        case 204:
          this.poll();
          break;
        case 410:
          this.readyState = SOCKET_STATES.open;
          this.onopen({});
          this.poll();
          break;
        case 403:
          this.onerror(403);
          this.close(1008, "forbidden", false);
          break;
        case 0:
        case 500:
          this.onerror(500);
          this.closeAndRetry(1011, "internal server error", 500);
          break;
        default:
          throw new Error(`unhandled poll status ${status}`);
      }
    });
  }
  // we collect all pushes within the current event loop by
  // setTimeout 0, which optimizes back-to-back procedural
  // pushes against an empty buffer
  send(body) {
    if (typeof body !== "string") {
      body = arrayBufferToBase64(body);
    }
    if (this.currentBatch) {
      this.currentBatch.push(body);
    } else if (this.awaitingBatchAck) {
      this.batchBuffer.push(body);
    } else {
      this.currentBatch = [body];
      this.currentBatchTimer = setTimeout(() => {
        this.batchSend(this.currentBatch);
        this.currentBatch = null;
      }, 0);
    }
  }
  batchSend(messages) {
    this.awaitingBatchAck = true;
    this.ajax("POST", "application/x-ndjson", messages.join("\n"), () => this.onerror("timeout"), (resp) => {
      this.awaitingBatchAck = false;
      if (!resp || resp.status !== 200) {
        this.onerror(resp && resp.status);
        this.closeAndRetry(1011, "internal server error", false);
      } else if (this.batchBuffer.length > 0) {
        this.batchSend(this.batchBuffer);
        this.batchBuffer = [];
      }
    });
  }
  close(code, reason, wasClean) {
    for (let req of this.reqs) {
      req.abort();
    }
    this.readyState = SOCKET_STATES.closed;
    let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
    this.batchBuffer = [];
    clearTimeout(this.currentBatchTimer);
    this.currentBatchTimer = null;
    if (typeof CloseEvent !== "undefined") {
      this.onclose(new CloseEvent("close", opts));
    } else {
      this.onclose(opts);
    }
  }
  ajax(method, contentType, body, onCallerTimeout, callback) {
    let req;
    let ontimeout = () => {
      this.reqs.delete(req);
      onCallerTimeout();
    };
    req = Ajax.request(method, this.endpointURL(), contentType, body, this.timeout, ontimeout, (resp) => {
      this.reqs.delete(req);
      if (this.isActive()) {
        callback(resp);
      }
    });
    this.reqs.add(req);
  }
};

// js/phoenix/presence.js
var Presence = class {
  constructor(channel, opts = {}) {
    let events = opts.events || { state: "presence_state", diff: "presence_diff" };
    this.state = {};
    this.pendingDiffs = [];
    this.channel = channel;
    this.joinRef = null;
    this.caller = {
      onJoin: function() {
      },
      onLeave: function() {
      },
      onSync: function() {
      }
    };
    this.channel.on(events.state, (newState) => {
      let { onJoin, onLeave, onSync } = this.caller;
      this.joinRef = this.channel.joinRef();
      this.state = Presence.syncState(this.state, newState, onJoin, onLeave);
      this.pendingDiffs.forEach((diff) => {
        this.state = Presence.syncDiff(this.state, diff, onJoin, onLeave);
      });
      this.pendingDiffs = [];
      onSync();
    });
    this.channel.on(events.diff, (diff) => {
      let { onJoin, onLeave, onSync } = this.caller;
      if (this.inPendingSyncState()) {
        this.pendingDiffs.push(diff);
      } else {
        this.state = Presence.syncDiff(this.state, diff, onJoin, onLeave);
        onSync();
      }
    });
  }
  onJoin(callback) {
    this.caller.onJoin = callback;
  }
  onLeave(callback) {
    this.caller.onLeave = callback;
  }
  onSync(callback) {
    this.caller.onSync = callback;
  }
  list(by) {
    return Presence.list(this.state, by);
  }
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel.joinRef();
  }
  // lower-level public static API
  /**
   * Used to sync the list of presences on the server
   * with the client's state. An optional `onJoin` and `onLeave` callback can
   * be provided to react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @returns {Presence}
   */
  static syncState(currentState, newState, onJoin, onLeave) {
    let state = this.clone(currentState);
    let joins = {};
    let leaves = {};
    this.map(state, (key, presence) => {
      if (!newState[key]) {
        leaves[key] = presence;
      }
    });
    this.map(newState, (key, newPresence) => {
      let currentPresence = state[key];
      if (currentPresence) {
        let newRefs = newPresence.metas.map((m) => m.phx_ref);
        let curRefs = currentPresence.metas.map((m) => m.phx_ref);
        let joinedMetas = newPresence.metas.filter((m) => curRefs.indexOf(m.phx_ref) < 0);
        let leftMetas = currentPresence.metas.filter((m) => newRefs.indexOf(m.phx_ref) < 0);
        if (joinedMetas.length > 0) {
          joins[key] = newPresence;
          joins[key].metas = joinedMetas;
        }
        if (leftMetas.length > 0) {
          leaves[key] = this.clone(currentPresence);
          leaves[key].metas = leftMetas;
        }
      } else {
        joins[key] = newPresence;
      }
    });
    return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
  }
  /**
   *
   * Used to sync a diff of presence join and leave
   * events from the server, as they happen. Like `syncState`, `syncDiff`
   * accepts optional `onJoin` and `onLeave` callbacks to react to a user
   * joining or leaving from a device.
   *
   * @returns {Presence}
   */
  static syncDiff(state, diff, onJoin, onLeave) {
    let { joins, leaves } = this.clone(diff);
    if (!onJoin) {
      onJoin = function() {
      };
    }
    if (!onLeave) {
      onLeave = function() {
      };
    }
    this.map(joins, (key, newPresence) => {
      let currentPresence = state[key];
      state[key] = this.clone(newPresence);
      if (currentPresence) {
        let joinedRefs = state[key].metas.map((m) => m.phx_ref);
        let curMetas = currentPresence.metas.filter((m) => joinedRefs.indexOf(m.phx_ref) < 0);
        state[key].metas.unshift(...curMetas);
      }
      onJoin(key, currentPresence, newPresence);
    });
    this.map(leaves, (key, leftPresence) => {
      let currentPresence = state[key];
      if (!currentPresence) {
        return;
      }
      let refsToRemove = leftPresence.metas.map((m) => m.phx_ref);
      currentPresence.metas = currentPresence.metas.filter((p) => {
        return refsToRemove.indexOf(p.phx_ref) < 0;
      });
      onLeave(key, currentPresence, leftPresence);
      if (currentPresence.metas.length === 0) {
        delete state[key];
      }
    });
    return state;
  }
  /**
   * Returns the array of presences, with selected metadata.
   *
   * @param {Object} presences
   * @param {Function} chooser
   *
   * @returns {Presence}
   */
  static list(presences, chooser) {
    if (!chooser) {
      chooser = function(key, pres) {
        return pres;
      };
    }
    return this.map(presences, (key, presence) => {
      return chooser(key, presence);
    });
  }
  // private
  static map(obj, func) {
    return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
  }
  static clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
};

// js/phoenix/serializer.js
var serializer_default = {
  HEADER_LENGTH: 1,
  META_LENGTH: 4,
  KINDS: { push: 0, reply: 1, broadcast: 2 },
  encode(msg, callback) {
    if (msg.payload.constructor === ArrayBuffer) {
      return callback(this.binaryEncode(msg));
    } else {
      let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
      return callback(JSON.stringify(payload));
    }
  },
  decode(rawPayload, callback) {
    if (rawPayload.constructor === ArrayBuffer) {
      return callback(this.binaryDecode(rawPayload));
    } else {
      let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
      return callback({ join_ref, ref, topic, event, payload });
    }
  },
  // private
  binaryEncode(message) {
    let { join_ref, ref, event, topic, payload } = message;
    let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
    let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
    let view = new DataView(header);
    let offset = 0;
    view.setUint8(offset++, this.KINDS.push);
    view.setUint8(offset++, join_ref.length);
    view.setUint8(offset++, ref.length);
    view.setUint8(offset++, topic.length);
    view.setUint8(offset++, event.length);
    Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    var combined = new Uint8Array(header.byteLength + payload.byteLength);
    combined.set(new Uint8Array(header), 0);
    combined.set(new Uint8Array(payload), header.byteLength);
    return combined.buffer;
  },
  binaryDecode(buffer) {
    let view = new DataView(buffer);
    let kind = view.getUint8(0);
    let decoder = new TextDecoder();
    switch (kind) {
      case this.KINDS.push:
        return this.decodePush(buffer, view, decoder);
      case this.KINDS.reply:
        return this.decodeReply(buffer, view, decoder);
      case this.KINDS.broadcast:
        return this.decodeBroadcast(buffer, view, decoder);
    }
  },
  decodePush(buffer, view, decoder) {
    let joinRefSize = view.getUint8(1);
    let topicSize = view.getUint8(2);
    let eventSize = view.getUint8(3);
    let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
    let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
    offset = offset + joinRefSize;
    let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    let event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    let data = buffer.slice(offset, buffer.byteLength);
    return { join_ref: joinRef, ref: null, topic, event, payload: data };
  },
  decodeReply(buffer, view, decoder) {
    let joinRefSize = view.getUint8(1);
    let refSize = view.getUint8(2);
    let topicSize = view.getUint8(3);
    let eventSize = view.getUint8(4);
    let offset = this.HEADER_LENGTH + this.META_LENGTH;
    let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
    offset = offset + joinRefSize;
    let ref = decoder.decode(buffer.slice(offset, offset + refSize));
    offset = offset + refSize;
    let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    let event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    let data = buffer.slice(offset, buffer.byteLength);
    let payload = { status: event, response: data };
    return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
  },
  decodeBroadcast(buffer, view, decoder) {
    let topicSize = view.getUint8(1);
    let eventSize = view.getUint8(2);
    let offset = this.HEADER_LENGTH + 2;
    let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    let event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    let data = buffer.slice(offset, buffer.byteLength);
    return { join_ref: null, ref: null, topic, event, payload: data };
  }
};

// js/phoenix/socket.js
var Socket = class {
  constructor(endPoint, opts = {}) {
    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
    this.channels = [];
    this.sendBuffer = [];
    this.ref = 0;
    this.timeout = opts.timeout || DEFAULT_TIMEOUT;
    this.transport = opts.transport || global.WebSocket || LongPoll;
    this.longPollFallbackMs = opts.longPollFallbackMs;
    this.fallbackTimer = null;
    this.sessionStore = opts.sessionStorage || global.sessionStorage;
    this.establishedConnections = 0;
    this.defaultEncoder = serializer_default.encode.bind(serializer_default);
    this.defaultDecoder = serializer_default.decode.bind(serializer_default);
    this.closeWasClean = false;
    this.binaryType = opts.binaryType || "arraybuffer";
    this.connectClock = 1;
    if (this.transport !== LongPoll) {
      this.encode = opts.encode || this.defaultEncoder;
      this.decode = opts.decode || this.defaultDecoder;
    } else {
      this.encode = this.defaultEncoder;
      this.decode = this.defaultDecoder;
    }
    let awaitingConnectionOnPageShow = null;
    if (phxWindow && phxWindow.addEventListener) {
      phxWindow.addEventListener("pagehide", (_e) => {
        if (this.conn) {
          this.disconnect();
          awaitingConnectionOnPageShow = this.connectClock;
        }
      });
      phxWindow.addEventListener("pageshow", (_e) => {
        if (awaitingConnectionOnPageShow === this.connectClock) {
          awaitingConnectionOnPageShow = null;
          this.connect();
        }
      });
    }
    this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
    this.rejoinAfterMs = (tries) => {
      if (opts.rejoinAfterMs) {
        return opts.rejoinAfterMs(tries);
      } else {
        return [1e3, 2e3, 5e3][tries - 1] || 1e4;
      }
    };
    this.reconnectAfterMs = (tries) => {
      if (opts.reconnectAfterMs) {
        return opts.reconnectAfterMs(tries);
      } else {
        return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
      }
    };
    this.logger = opts.logger || null;
    if (!this.logger && opts.debug) {
      this.logger = (kind, msg, data) => {
        console.log(`${kind}: ${msg}`, data);
      };
    }
    this.longpollerTimeout = opts.longpollerTimeout || 2e4;
    this.params = closure(opts.params || {});
    this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
    this.vsn = opts.vsn || DEFAULT_VSN;
    this.heartbeatTimeoutTimer = null;
    this.heartbeatTimer = null;
    this.pendingHeartbeatRef = null;
    this.reconnectTimer = new Timer(() => {
      this.teardown(() => this.connect());
    }, this.reconnectAfterMs);
  }
  /**
   * Returns the LongPoll transport reference
   */
  getLongPollTransport() {
    return LongPoll;
  }
  /**
   * Disconnects and replaces the active transport
   *
   * @param {Function} newTransport - The new transport class to instantiate
   *
   */
  replaceTransport(newTransport) {
    this.connectClock++;
    this.closeWasClean = true;
    clearTimeout(this.fallbackTimer);
    this.reconnectTimer.reset();
    if (this.conn) {
      this.conn.close();
      this.conn = null;
    }
    this.transport = newTransport;
  }
  /**
   * Returns the socket protocol
   *
   * @returns {string}
   */
  protocol() {
    return location.protocol.match(/^https/) ? "wss" : "ws";
  }
  /**
   * The fully qualified socket url
   *
   * @returns {string}
   */
  endPointURL() {
    let uri = Ajax.appendParams(
      Ajax.appendParams(this.endPoint, this.params()),
      { vsn: this.vsn }
    );
    if (uri.charAt(0) !== "/") {
      return uri;
    }
    if (uri.charAt(1) === "/") {
      return `${this.protocol()}:${uri}`;
    }
    return `${this.protocol()}://${location.host}${uri}`;
  }
  /**
   * Disconnects the socket
   *
   * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
   *
   * @param {Function} callback - Optional callback which is called after socket is disconnected.
   * @param {integer} code - A status code for disconnection (Optional).
   * @param {string} reason - A textual description of the reason to disconnect. (Optional)
   */
  disconnect(callback, code, reason) {
    this.connectClock++;
    this.closeWasClean = true;
    clearTimeout(this.fallbackTimer);
    this.reconnectTimer.reset();
    this.teardown(callback, code, reason);
  }
  /**
   *
   * @param {Object} params - The params to send when connecting, for example `{user_id: userToken}`
   *
   * Passing params to connect is deprecated; pass them in the Socket constructor instead:
   * `new Socket("/socket", {params: {user_id: userToken}})`.
   */
  connect(params) {
    if (params) {
      console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
      this.params = closure(params);
    }
    if (this.conn) {
      return;
    }
    if (this.longPollFallbackMs && this.transport !== LongPoll) {
      this.connectWithFallback(LongPoll, this.longPollFallbackMs);
    } else {
      this.transportConnect();
    }
  }
  /**
   * Logs the message. Override `this.logger` for specialized logging. noops by default
   * @param {string} kind
   * @param {string} msg
   * @param {Object} data
   */
  log(kind, msg, data) {
    this.logger && this.logger(kind, msg, data);
  }
  /**
   * Returns true if a logger has been set on this socket.
   */
  hasLogger() {
    return this.logger !== null;
  }
  /**
   * Registers callbacks for connection open events
   *
   * @example socket.onOpen(function(){ console.info("the socket was opened") })
   *
   * @param {Function} callback
   */
  onOpen(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.open.push([ref, callback]);
    return ref;
  }
  /**
   * Registers callbacks for connection close events
   * @param {Function} callback
   */
  onClose(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.close.push([ref, callback]);
    return ref;
  }
  /**
   * Registers callbacks for connection error events
   *
   * @example socket.onError(function(error){ alert("An error occurred") })
   *
   * @param {Function} callback
   */
  onError(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.error.push([ref, callback]);
    return ref;
  }
  /**
   * Registers callbacks for connection message events
   * @param {Function} callback
   */
  onMessage(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.message.push([ref, callback]);
    return ref;
  }
  /**
   * Pings the server and invokes the callback with the RTT in milliseconds
   * @param {Function} callback
   *
   * Returns true if the ping was pushed or false if unable to be pushed.
   */
  ping(callback) {
    if (!this.isConnected()) {
      return false;
    }
    let ref = this.makeRef();
    let startTime = Date.now();
    this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
    let onMsgRef = this.onMessage((msg) => {
      if (msg.ref === ref) {
        this.off([onMsgRef]);
        callback(Date.now() - startTime);
      }
    });
    return true;
  }
  /**
   * @private
   */
  transportConnect() {
    this.connectClock++;
    this.closeWasClean = false;
    this.conn = new this.transport(this.endPointURL());
    this.conn.binaryType = this.binaryType;
    this.conn.timeout = this.longpollerTimeout;
    this.conn.onopen = () => this.onConnOpen();
    this.conn.onerror = (error) => this.onConnError(error);
    this.conn.onmessage = (event) => this.onConnMessage(event);
    this.conn.onclose = (event) => this.onConnClose(event);
  }
  getSession(key) {
    return this.sessionStore && this.sessionStore.getItem(key);
  }
  storeSession(key, val) {
    this.sessionStore && this.sessionStore.setItem(key, val);
  }
  connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
    clearTimeout(this.fallbackTimer);
    let established = false;
    let primaryTransport = true;
    let openRef, errorRef;
    let fallback = (reason) => {
      this.log("transport", `falling back to ${fallbackTransport.name}...`, reason);
      this.off([openRef, errorRef]);
      primaryTransport = false;
      this.storeSession("phx:longpoll", "true");
      this.replaceTransport(fallbackTransport);
      this.transportConnect();
    };
    if (this.getSession("phx:longpoll")) {
      return fallback("memorized");
    }
    this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
    errorRef = this.onError((reason) => {
      this.log("transport", "error", reason);
      if (primaryTransport && !established) {
        clearTimeout(this.fallbackTimer);
        fallback(reason);
      }
    });
    this.onOpen(() => {
      established = true;
      if (!primaryTransport) {
        return console.log("transport", `established ${fallbackTransport.name} fallback`);
      }
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
      this.ping((rtt) => {
        this.log("transport", "connected to primary after", rtt);
        clearTimeout(this.fallbackTimer);
      });
    });
    this.transportConnect();
  }
  clearHeartbeats() {
    clearTimeout(this.heartbeatTimer);
    clearTimeout(this.heartbeatTimeoutTimer);
  }
  onConnOpen() {
    if (this.hasLogger())
      this.log("transport", `${this.transport.name} connected to ${this.endPointURL()}`);
    this.closeWasClean = false;
    this.establishedConnections++;
    this.flushSendBuffer();
    this.reconnectTimer.reset();
    this.resetHeartbeat();
    this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
  }
  /**
   * @private
   */
  heartbeatTimeout() {
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null;
      if (this.hasLogger()) {
        this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      }
      this.triggerChanError();
      this.closeWasClean = false;
      this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
    }
  }
  resetHeartbeat() {
    if (this.conn && this.conn.skipHeartbeat) {
      return;
    }
    this.pendingHeartbeatRef = null;
    this.clearHeartbeats();
    this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
  }
  teardown(callback, code, reason) {
    if (!this.conn) {
      return callback && callback();
    }
    this.waitForBufferDone(() => {
      if (this.conn) {
        if (code) {
          this.conn.close(code, reason || "");
        } else {
          this.conn.close();
        }
      }
      this.waitForSocketClosed(() => {
        if (this.conn) {
          this.conn.onopen = function() {
          };
          this.conn.onerror = function() {
          };
          this.conn.onmessage = function() {
          };
          this.conn.onclose = function() {
          };
          this.conn = null;
        }
        callback && callback();
      });
    });
  }
  waitForBufferDone(callback, tries = 1) {
    if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
      callback();
      return;
    }
    setTimeout(() => {
      this.waitForBufferDone(callback, tries + 1);
    }, 150 * tries);
  }
  waitForSocketClosed(callback, tries = 1) {
    if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
      callback();
      return;
    }
    setTimeout(() => {
      this.waitForSocketClosed(callback, tries + 1);
    }, 150 * tries);
  }
  onConnClose(event) {
    let closeCode = event && event.code;
    if (this.hasLogger())
      this.log("transport", "close", event);
    this.triggerChanError();
    this.clearHeartbeats();
    if (!this.closeWasClean && closeCode !== 1e3) {
      this.reconnectTimer.scheduleTimeout();
    }
    this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
  }
  /**
   * @private
   */
  onConnError(error) {
    if (this.hasLogger())
      this.log("transport", error);
    let transportBefore = this.transport;
    let establishedBefore = this.establishedConnections;
    this.stateChangeCallbacks.error.forEach(([, callback]) => {
      callback(error, transportBefore, establishedBefore);
    });
    if (transportBefore === this.transport || establishedBefore > 0) {
      this.triggerChanError();
    }
  }
  /**
   * @private
   */
  triggerChanError() {
    this.channels.forEach((channel) => {
      if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
        channel.trigger(CHANNEL_EVENTS.error);
      }
    });
  }
  /**
   * @returns {string}
   */
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case SOCKET_STATES.connecting:
        return "connecting";
      case SOCKET_STATES.open:
        return "open";
      case SOCKET_STATES.closing:
        return "closing";
      default:
        return "closed";
    }
  }
  /**
   * @returns {boolean}
   */
  isConnected() {
    return this.connectionState() === "open";
  }
  /**
   * @private
   *
   * @param {Channel}
   */
  remove(channel) {
    this.off(channel.stateChangeRefs);
    this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
  }
  /**
   * Removes `onOpen`, `onClose`, `onError,` and `onMessage` registrations.
   *
   * @param {refs} - list of refs returned by calls to
   *                 `onOpen`, `onClose`, `onError,` and `onMessage`
   */
  off(refs) {
    for (let key in this.stateChangeCallbacks) {
      this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
        return refs.indexOf(ref) === -1;
      });
    }
  }
  /**
   * Initiates a new channel for the given topic
   *
   * @param {string} topic
   * @param {Object} chanParams - Parameters for the channel
   * @returns {Channel}
   */
  channel(topic, chanParams = {}) {
    let chan = new Channel(topic, chanParams, this);
    this.channels.push(chan);
    return chan;
  }
  /**
   * @param {Object} data
   */
  push(data) {
    if (this.hasLogger()) {
      let { topic, event, payload, ref, join_ref } = data;
      this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
    }
    if (this.isConnected()) {
      this.encode(data, (result) => this.conn.send(result));
    } else {
      this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
    }
  }
  /**
   * Return the next message ref, accounting for overflows
   * @returns {string}
   */
  makeRef() {
    let newRef = this.ref + 1;
    if (newRef === this.ref) {
      this.ref = 0;
    } else {
      this.ref = newRef;
    }
    return this.ref.toString();
  }
  sendHeartbeat() {
    if (this.pendingHeartbeatRef && !this.isConnected()) {
      return;
    }
    this.pendingHeartbeatRef = this.makeRef();
    this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
    this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
  }
  flushSendBuffer() {
    if (this.isConnected() && this.sendBuffer.length > 0) {
      this.sendBuffer.forEach((callback) => callback());
      this.sendBuffer = [];
    }
  }
  onConnMessage(rawMessage) {
    this.decode(rawMessage.data, (msg) => {
      let { topic, event, payload, ref, join_ref } = msg;
      if (ref && ref === this.pendingHeartbeatRef) {
        this.clearHeartbeats();
        this.pendingHeartbeatRef = null;
        this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
      }
      if (this.hasLogger())
        this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
      for (let i = 0; i < this.channels.length; i++) {
        const channel = this.channels[i];
        if (!channel.isMember(topic, event, payload, join_ref)) {
          continue;
        }
        channel.trigger(event, payload, ref, join_ref);
      }
      for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
        let [, callback] = this.stateChangeCallbacks.message[i];
        callback(msg);
      }
    });
  }
  leaveOpenTopic(topic) {
    let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
    if (dupChannel) {
      if (this.hasLogger())
        this.log("transport", `leaving duplicate topic "${topic}"`);
      dupChannel.leave();
    }
  }
};

//# sourceMappingURL=phoenix.mjs.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Utils: () => (/* reexport module object */ _utils_index__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var _context_socket_SocketProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context/socket/SocketProvider */ "./src/context/socket/SocketProvider.js");
/* harmony import */ var _context_store_StoreProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context/store/StoreProvider */ "./src/context/store/StoreProvider.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/index */ "./src/utils/index.js");






const SariskaCollaborativeAnnotation = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_context_store_StoreProvider__WEBPACK_IMPORTED_MODULE_4__.StoreProvider, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_context_socket_SocketProvider__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], props)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SariskaCollaborativeAnnotation);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map