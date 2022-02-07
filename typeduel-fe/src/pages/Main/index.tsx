import { useAuthContext } from "../../context/AuthContext";

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
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
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
