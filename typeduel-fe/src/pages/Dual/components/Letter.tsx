interface Props {
  letter: string;
  isActive: boolean;
}

const Letter = ({ letter, isActive }: Props) => {
  return (
    <div
      className={`bg-blue-200  flex items-center m-2 rounded-lg shadow-md ${
        isActive ? "opacity-1 px-5 py-3" : "opacity-50 px-4 py-2"
      } `}
    >
      <h1 className="font-bold text-2xl text-blue-900">{letter}</h1>
    </div>
  );
};

export default Letter;
