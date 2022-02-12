import { useNavigate } from "react-location";
import { useAuthContext } from "../../../../../../../context/AuthContext";
import { useSocket } from "../../../../../../../hooks/useSocket";

const useJoinGame = () => {
  const { user } = useAuthContext();
  const socket = useSocket();
  const navigate = useNavigate();

  return (id: string, challenger: string) => {
    if (socket) {
      socket.emit(`start_game`, {
        gameId: id,
        type: "join",
        braveHero: user?.name,
      });
      socket.on("game_joined", () => navigate({ to: `/dual/${challenger}` }));
    }
  };
};

export default useJoinGame;
