import { useMainDual } from "./hooks/useMainDual";

const Dual = () => {
  const { letters, isLoading } = useMainDual();
  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
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
  );
};

export default Dual;
