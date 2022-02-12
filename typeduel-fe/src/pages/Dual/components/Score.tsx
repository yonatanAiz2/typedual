interface Props {
  challenger: {
    name: string;
    score: number;
  };
  enemy: {
    name: string;
    score: number;
  };
}

const Score = ({ challenger, enemy }: Props) => {
  return (
    <div className="flex justify-between text-5xl font-bold">
      <div>
        <h2>{challenger.name}</h2>
        <p>Score: {challenger.score}</p>
      </div>
      <div>
        <h2>{enemy.name}</h2>
        <p>Score: {enemy.score}</p>
      </div>
    </div>
  );
};

export default Score;
