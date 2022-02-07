function generateRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

const getDifferentLetterThen = (prevLetter: string = ""): string => {
  const generated = generateRandomLetter().toUpperCase();
  if (generated.toLowerCase() === prevLetter.toLowerCase()) {
    return getDifferentLetterThen(prevLetter);
  }

  return generated;
};

export function generateLetters(length = 100) {
  let prev = "";
  return Array.from({ length }, (_, i) => {
    prev = getDifferentLetterThen(prev);
    return {
      id: i,
      value: prev,
    };
  });
}
