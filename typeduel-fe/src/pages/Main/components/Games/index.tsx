import { useAuthContext } from "../../../../context/AuthContext";
import { useSocket } from "../../../../hooks/useSocket";
import CreateGameForm from "./components/CreateGameForm/CreateGameForm";
import GameList from "./components/GameList/GameList";
import useGamesQuery from "./hooks/useGamesQuery";

const Games = () => {
  const { data: games, refetch } = useGamesQuery();
  useSocket((io) => io.on("new_game_started", () => refetch()));

  return (
    <div>
      <CreateGameForm />
      {games ? <GameList games={games} /> : "no games yet"}
    </div>
  );
};

export default Games;
