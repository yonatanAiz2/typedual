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

  const games = await (
    await repository.search().all({ pageSize: 3 })
  ).sort((a, b) => (a.entityId > b.entityId ? -1 : 1));

  return games;
}
