import React from "react";
import "./index.css";
import App from "./App";
import SocketProvider from "./context/socket/SocketProvider";
import { StoreProvider } from "./context/store/StoreProvider";

const SariskaCollaborativeAnnotation = (props) => {
  return (
    <div>
    <StoreProvider>
      <SocketProvider>
        <App {...props} />
      </SocketProvider>
    </StoreProvider>
    </div>
  )
}

export default SariskaCollaborativeAnnotation;