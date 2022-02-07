import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { initSocket } from "./config/socket";
import { router } from "./routes/users";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const server = http.createServer(app);
initSocket(server);

server.listen(4000, function () {
  console.log("listening on *:4000");
});
