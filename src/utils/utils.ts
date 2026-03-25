export const getUniqueThings = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};


