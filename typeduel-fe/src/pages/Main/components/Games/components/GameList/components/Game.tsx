import Button from "../../../../../../../components/Button";

interface Props {
  game: Game;
  joinGame: (gameId: string, challenger: string) => void;
}

const Game = ({ game, joinGame }: Props) => {
  return (
    <>
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
    </>
  );
};

export default Game;
