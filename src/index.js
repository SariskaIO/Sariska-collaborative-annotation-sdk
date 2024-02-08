import React from "react";
import "./index.css";
import App from "./App";
import SocketProvider from "./context/socket/SocketProvider";
import { StoreProvider } from "./context/store/StoreProvider";

const SariskaCollaborativeAnnotation = () => {
  return (
    <StoreProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </StoreProvider>
  )
}

export default SariskaCollaborativeAnnotation;