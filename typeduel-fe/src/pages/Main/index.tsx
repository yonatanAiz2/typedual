import React, { useState } from "react";
import { useNavigate } from "react-location";
import { useQuery } from "react-query";
import { useAuthContext } from "../../context/AuthContext";
import { useSocket } from "../../hooks/useSocket";

interface GameInfo {
  keys: number;
}
interface Gamer {
  id: number;
  name: string;
  wins: number;
  gameInfo: GameInfo;
}

const useGamers = () => {
  return { gamers: [] as Gamer[] };
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  children: React.ReactNode;
}
const Button = ({
  children,
  variant = "primary",
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      {...buttonProps}
    >
      {children}
    </button>
  );
};

const useGamesQuery = () => {
  const fetchGames = async () => {
    const res = await fetch("http://localhost:4000/game");
    const data = await res.json();
    return data.games;
  };
  return useQuery("games", fetchGames);
};
const GamersBoard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isWaitingForJoinGame, setWaitingForJoinGame] = useState(false);
  const { data: games, refetch } = useGamesQuery();
  const socket = useSocket((io) => io.on("new_game_started", () => refetch()));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket && user) {
      const form = new FormData(e.target as HTMLFormElement);
      const { letters = 40 } = Object.fromEntries(form.entries());

      const res = await fetch("http://localhost:4000/game/createGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challenger: user?.name,
          letters: Number(letters),
        }),
      });
      const { game } = await res.json();

      socket.emit(`start_game`, { gameId: game.id, type: "create" });
      socket.on("game_started", () => setWaitingForJoinGame(true));
      socket.on(`challenge_accepted_${game.id}`, (params) =>
        navigate({ to: `/dual/${params.braveHero}` })
      );
      socket.on("error_start_game", ({ error }) => alert(error));
    }
  };

  const joinGame = (id: string, challenger: string) => {
    if (socket) {
      socket.emit(`start_game`, {
        gameId: id,
        type: "join",
        braveHero: user?.name,
      });
      socket.on("game_joined", () => navigate({ to: `/dual/${challenger}` }));
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Letters
        </label>
        <input
          className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="letters"
          name="letters"
          type="number"
          placeholder="letters"
        />
        <Button variant="secondary" type="submit">
          Create game
        </Button>
      </form>
      {isWaitingForJoinGame && (
        <h2 className="text font-bold text-gray-900 text-3xl">
          Waiting for someone to accept your challenge
        </h2>
      )}
      <ul>
        {games?.map((game) => (
          <li className="m-3 w-100 flex justify-between" key={game.entityId}>
            <div>
              <span className="text-blue-700 text-sm mr-1 font-bold mb-2">
                Challenger
              </span>
              {game.challenger}
              <span className="text-blue-700 ml-4 mr-1 text-sm font-bold mb-2">
                Letters
              </span>
              {game.letters}
            </div>
            <Button onClick={() => joinGame(game.entityId, game.challenger)}>
              Join game
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ConnectOrRegisterForm = () => {
  const { login } = useAuthContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(form.entries());
    login(formData.username as string);
  };
  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
};
const Main = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <h1>Main</h1>
      {user ? <GamersBoard /> : <ConnectOrRegisterForm />}
    </div>
  );
};

export default Main;
