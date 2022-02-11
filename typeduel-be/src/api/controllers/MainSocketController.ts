import {
  ConnectedSocket,
  MessageBody,
  OnConnect,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Socket, Server } from "socket.io";

@SocketController()
class MainSocketController {
  @OnConnect()
  public onConnection(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server
  ) {
    console.log("NEW connected ", socket.id);
  }

  @OnMessage("message")
  message(@SocketIO() io, @ConnectedSocket() Socket, @MessageBody() message) {
    io.emit("message-from-server", message);
  }
}

export default MainSocketController;
