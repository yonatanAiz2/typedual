import { useMatch } from "react-location";
import { useAuthContext } from "../../context/AuthContext";
import { useMainDual } from "./hooks/useMainDual";

const Dual = () => {
  const { params } = useMatch();
  const { user } = useAuthContext();
  const { enemy } = params;

  const { letters, isLoading, enemyScore } = useMainDual(enemy, user?.name);
  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <div className="flex justify-between text-5xl font-bold">
        <div>
          <h2>{user?.name}</h2>
          <p>Score: {30 - letters.length}</p>
        </div>
        <div>
          <h2>{enemy}</h2>
          <p>Score: {30 - enemyScore}</p>
        </div>
      </div>
      <div className="flex justify-start items-center">
        {letters.map((letter, i) => (
          <div
            key={letter.id}
            className={`bg-blue-200  flex items-center m-2 rounded-lg shadow-md ${
              i === 0 ? "opacity-1 px-5 py-3" : "opacity-50 px-4 py-2"
            } `}
          >
            <h1 className="font-bold text-2xl text-blue-900">{letter.value}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dual;
