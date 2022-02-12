import { useNavigate } from "react-location";
import Button from "../../../../../../components/Button";
import { useAuthContext } from "../../../../../../context/AuthContext";
import { useSocket } from "../../../../../../hooks/useSocket";
import Game from "./components/Game";
import useJoinGame from "./hooks/useJoinGame";

interface Props {
  games: Game[];
}

const GameList = ({ games }: Props) => {
  const joinGame = useJoinGame();

  return (
    <ul>
      {games.map((game) => (
        <li className="m-3 w-100 flex justify-between" key={game.entityId}>
          <Game game={game} joinGame={joinGame} />
        </li>
      ))}
    </ul>
  );
};

export default GameList;
