import { useMatch } from "react-location";
import { useAuthContext } from "../../context/AuthContext";
import Letter from "./components/Letter";
import Score from "./components/Score";
import { useMainDual } from "./hooks/useMainDual";

const Dual = () => {
  const { params } = useMatch();
  const { user } = useAuthContext();
  const { enemy } = params;

  const { letters, isLoading, enemyScore } = useMainDual(enemy, user?.name);

  if (isLoading || !user) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <Score
        challenger={{ name: user.name, score: 30 - letters.length }}
        enemy={{ name: enemy, score: 30 - enemyScore }}
      />
      <div className="flex justify-start items-center">
        {letters.map((letter, i) => (
          <Letter key={letter.id} letter={letter.value} isActive={i === 0} />
        ))}
      </div>
    </div>
  );
};

export default Dual;
