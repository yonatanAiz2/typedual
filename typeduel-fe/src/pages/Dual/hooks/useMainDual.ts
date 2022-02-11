import { useEffect, useState } from "react";
import { useLetters } from "../../../hooks/useLetters";
import { useSocket } from "../../../hooks/useSocket";

export const useMainDual = (enemy: string, challenger: string) => {
  const { letters } = useLetters();

  const socket = useSocket();
  const [enemyScore, setEnemyScore] = useState(30);

  useEffect(() => {
    if (socket) {
      socket.on(
        "enemy-score",
        (res) => res.enemy === enemy && setEnemyScore(res.score)
      );
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("score", { enemy: challenger, score: letters.length });
    }
  }, [socket, letters]);

  return { letters, isLoading: !socket, enemyScore };
};
