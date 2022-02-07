import { useEffect, useState } from "react";
import ioClient, { Socket } from "socket.io-client";
import useSound from "use-sound";
import clickSound from "./assets/sounds/H8FUYP6-casual-tap.mp3";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const ioSocket = ioClient("http://localhost:4000", { extraHeaders: {} });
    ioSocket.on("connect", () => {
      setSocket(ioSocket);
    });

    ioSocket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      ioSocket.close();
    };
  }, []);

  return socket;
};

function generateRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function generateLetters(length = 100) {
  return Array.from({ length }, (_, i) => ({
    id: i,
    value: generateRandomLetter().toUpperCase(),
  }));
}

const useLetters = (length = 30) => {
  const [letters, setLetters] = useState(generateLetters(length));
  const [sound] = useSound(clickSound);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      setLetters((prev) => {
        const [first, ...rest] = prev;
        if (first.value.toLowerCase() === e.key) {
          return rest;
        }

        return prev;
      });
    });
  }, [sound]);

  useEffect(() => {
    if (length !== letters.length) sound();
  }, [letters, sound, length]);

  return { letters };
};

const useMainDual = () => {
  const { letters } = useLetters();

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("message-from-server", (a) => console.log(a));
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("message", letters.length);
    }
  }, [socket, letters]);

  return { letters, isLoading: !socket };
};

const Game = () => {
  const { letters, isLoading } = useMainDual();
  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="flex justify-start items-center">
      {letters.map((letter, i) => (
        <div
          className={`bg-blue-200  flex items-center m-2 rounded-lg shadow-md ${
            i === 0 ? "opacity-1 px-5 py-3" : "opacity-50 px-4 py-2"
          } `}
        >
          <h1 className="font-bold text-2xl text-blue-900" key={letter.id}>
            {letter.value}
          </h1>
        </div>
      ))}
    </div>
  );
};

interface Gamer {
  id: number;
  name: string;
  wins: number;
  gameInfo: {
    keys: number;
  };
}

const useGamers = () => {
  return { gamers: [] as Gamer[] };
};
const GamersBoard = () => {
  const { gamers } = useGamers();
  return (
    <div>
      {gamers.map((gamer) => (
        <div key={gamer.id}>{gamer.name}</div>
      ))}
    </div>
  );
};

function App() {
  return (
    <div className="container mx-auto px-4">
      <Game />
    </div>
  );
}

export default App;
