import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { useSocketServer } from "socket-controllers";

export function initSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  useSocketServer(io, { controllers: ["../api/controllers/*"] });
  return io;
}
