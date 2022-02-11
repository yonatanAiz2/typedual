import { Repository } from "redis-om";
import { client } from "../../config/redis";
import { gameSchema } from "../models/game.model";

export async function createGame(data: Game) {
  const repository = new Repository(gameSchema, client);

  // @ts-ignore
  const game = repository.createEntity(data);

  const id = await repository.save(game);
  return id;
}

export async function getGames() {
  const repository = new Repository(gameSchema, client);

  const games = await repository.search().all({ pageSize: 10 });
  console.log(games);
  return games;
}
