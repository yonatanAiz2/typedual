import { useQuery } from "react-query";
import axiosInstance from "../../../../../utils/axiosInstance";

const useGamesQuery = () => {
  const fetchGames = async () => {
    const { data } = await axiosInstance.get<{ games: Game[] }>("game");
    return data.games;
  };

  return useQuery("games", fetchGames);
};

export default useGamesQuery;
