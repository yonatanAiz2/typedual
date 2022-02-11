import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import path from "path";
import { useSocketServer } from "socket-controllers";

export function initSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  useSocketServer(io, {
    controllers: [__dirname + "/api/controllers/*.ts"],
  });
  return io;
}
