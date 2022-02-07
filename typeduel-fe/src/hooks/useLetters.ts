import { useState, useEffect } from "react";
import useSound from "use-sound";
import clickSound from "../assets/sounds/H8FUYP6-casual-tap.mp3";
import { generateLetters } from "../utils/generateLetters";

export const useLetters = (length = 30) => {
  const [letters, setLetters] = useState(generateLetters(length));
  const [sound] = useSound(clickSound);

  const handleLetterClick = (e: KeyboardEvent) => {
    setLetters((prev) => {
      const [first, ...rest] = prev;
      if (first.value.toLowerCase() === e.key) {
        return rest;
      }

      return prev;
    });
  };
  useEffect(() => {
    document.addEventListener("keypress", handleLetterClick);

    return () => document.removeEventListener("keypress", handleLetterClick);
  }, []);

  useEffect(() => {
    if (length !== letters.length) sound();
  }, [letters, sound, length]);

  return { letters };
};
