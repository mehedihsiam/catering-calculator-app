const gramToKG = (grams: number): string => {
  if (grams < 1000) {
    return `${grams} gm`;
  }
  const kgValue = grams / 1000;
  return `${kgValue.toFixed(2)} kg`;
};

export default gramToKG;
