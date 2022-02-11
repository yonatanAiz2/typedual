import React from "react";
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

const GamersBoard = () => {
  const socket = useSocket();
  const { gamers } = useGamers();
  const { user } = useAuthContext();
  const handleClick = async () => {
    const res = await fetch("http://localhost:4000/game/createGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ challenger: user?.name, letters: 40 }),
    });
    const { game } = await res.json();

    if (socket) {
      socket.on(`challenge-accepted`, (challenger) => {
        console.log(challenger);
      });
    }
  };

  const test = () => {
    socket?.emit("challenge-accepted");
  };

  return (
    <div>
      <Button variant="secondary" type="button" onClick={handleClick}>
        Create game
      </Button>
      <Button type="button" onClick={test}>
        Accept game
      </Button>
      {gamers.map((gamer) => (
        <div key={gamer.id}>{gamer.name}</div>
      ))}
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
