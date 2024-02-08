import React from "react";
import "./index.css";
import App from "./App";
import SocketProvider from "./context/socket/SocketProvider";
import { StoreProvider } from "./context/store/StoreProvider";

const SariskaCollaborativeAnnotation = () => {
  return (
    <div>
    <StoreProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </StoreProvider>
    </div>
  )
}

export default SariskaCollaborativeAnnotation;