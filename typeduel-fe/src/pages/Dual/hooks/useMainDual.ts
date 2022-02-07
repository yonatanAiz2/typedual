import { useEffect } from "react";
import { useLetters } from "../../../hooks/useLetters";
import { useSocket } from "../../../hooks/useSocket";

export const useMainDual = () => {
  const { letters } = useLetters();
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("message-from-server", (a) => console.log(a));
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("message", letters.length);
    }
  }, [socket, letters]);

  return { letters, isLoading: !socket };
};
