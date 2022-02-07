import { useState, useEffect } from "react";
import ioClient, { Socket } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const ioSocket = ioClient("http://localhost:4000", { extraHeaders: {} });
    ioSocket.on("connect", () => {
      setSocket(ioSocket);
    });

    ioSocket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      ioSocket.close();
    };
  }, []);

  return socket;
};
