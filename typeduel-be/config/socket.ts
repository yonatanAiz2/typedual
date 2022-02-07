import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

export function initSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  io.on("connection", function (socket) {
    console.log("A user connected");

    socket.on("message", (message) => {
      socket.emit("message-from-server", "i got your message!");
    });

    socket.on("disconnect", function () {
      console.log("A user disconnected");
    });
  });
}
