export const generateRandomNumber = (limit: number) =>
  Math.floor(Math.random() * limit);

export const generateUpperLowerNumbers = (gap: number, limit: number = 90) => {
  const floor = generateRandomNumber(limit);
  const ceil = floor + gap;
  return {
    floor,
    ceil,
  };
};
