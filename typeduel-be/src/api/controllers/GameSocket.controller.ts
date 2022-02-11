import {
  ConnectedSocket,
  MessageBody,
  OnConnect,
  OnMessage,
  SocketController,
  SocketIO,
  SocketQueryParam,
} from "socket-controllers";
import { Socket, Server } from "socket.io";

@SocketController()
class GameSocket {
  @OnMessage("start_game")
  public async startGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    message: {
      gameId: string;
      type: "create" | "join";
      challenger: string;
      braveHero: string;
    }
  ) {
    console.log("Game id", message.gameId, "type ", message.type);

    if (!message.gameId) {
      socket.emit("error_start_game", {
        error: "Please provide room id!",
      });
    }

    const connectedSockets = io.sockets.adapter.rooms.get(message.gameId);
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (room) => room !== socket.id
    );

    if (message.type === "create") {
      console.log("Creating new game");

      if (socketRooms.length === 0) {
        await socket.join(message.gameId);
        socket.emit("game_started");
        io.emit("new_game_started");
      } else {
        socket.emit("error_start_game", {
          error: "Already created a room",
        });
      }
    } else {
      console.log("ON JOIN", socketRooms.length, connectedSockets?.size);

      if (socketRooms.length === 0 && connectedSockets?.size === 1) {
        await socket.join(message.gameId);
        socket.emit("game_joined");
        io.emit(`challenge_accepted_${message.gameId}`, {
          challenger: message.challenger,
          braveHero: message.braveHero,
        });
      } else {
        socket.emit("error_start_game", {
          error: "room is full",
        });
      }
    }
  }

  @OnMessage("score")
  public async score(@SocketIO() io: Server, @MessageBody() message) {
    io.emit("enemy-score", message);
  }
}

export default GameSocket;
