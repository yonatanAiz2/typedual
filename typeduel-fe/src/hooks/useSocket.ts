import { useState, useEffect } from "react";
import ioClient, { Socket } from "socket.io-client";

export const useSocket = (addSocketEvents?: (socket: Socket) => void) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const ioSocket = ioClient("http://localhost:4000");
    ioSocket.on("connect", () => {
      setSocket(ioSocket);
    });

    ioSocket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    if (addSocketEvents) {
      addSocketEvents(ioSocket);
    }
    return () => {
      ioSocket.close();
    };
  }, []);

  return socket;
};
