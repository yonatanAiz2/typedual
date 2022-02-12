import { useState } from "react";
import { useNavigate } from "react-location";
import { useAuthContext } from "../../../../../../../context/AuthContext";
import { useSocket } from "../../../../../../../hooks/useSocket";
import axiosInstance from "../../../../../../../utils/axiosInstance";

const useCreateGameForm = () => {
  const [isWaitingForJoinGame, setWaitingForJoinGame] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const socket = useSocket();

  const createGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket && user) {
      const form = new FormData(e.target as HTMLFormElement);
      const { letters } = Object.fromEntries(form.entries());

      const {
        data: { game },
      } = await axiosInstance.post<{ game: Game & { id: string } }>(
        "game/createGame",
        {
          challenger: user?.name,
          letters: Number(letters) || 40,
        }
      );

      socket.emit(`start_game`, { gameId: game.id, type: "create" });
      socket.on("game_started", () => setWaitingForJoinGame(true));
      socket.on(`challenge_accepted_${game.id}`, (params) =>
        navigate({ to: `/dual/${params.braveHero}` })
      );
      socket.on("error_start_game", ({ error }) => alert(error));
    }
  };

  return { createGame, isWaitingForJoinGame };
};

export default useCreateGameForm;
