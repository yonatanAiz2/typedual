import express from "express";
import { redisConnectionMiddleware } from "../config/redis";
import { createNewGame, getAllGames } from "../api/controllers/game.controller";
export const gameRouter = express.Router();

gameRouter.use(redisConnectionMiddleware);

gameRouter.route("/game").get(async function (_, res) {
  try {
    const games = await getAllGames();
    return res.json({ games });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
});

gameRouter
  .route("/game/createGame")
  .get(function (_, res) {
    return res.send("GAME");
  })
  .post(async function (req, res) {
    try {
      const game = await createNewGame(req.body);
      return res.status(201).json({ game });
    } catch (e: any) {
      console.error(e);

      return res.status(400).json({ error: e.message });
    }
  });
