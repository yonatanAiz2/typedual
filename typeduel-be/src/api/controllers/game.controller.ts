import { createGame, getGames } from "../service/game.service";

export async function createNewGame(gameToCreate: Game) {
  if (!gameToCreate.challenger) {
    throw new Error("FUck you!");
  }

  const gameId = await createGame(gameToCreate);

  return { ...gameToCreate, id: gameId };
}

export async function getAllGames() {
  return await getGames();
}
