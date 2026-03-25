export const getStatusDetailes = (
  status: string,
): { title: string; color: string } | null => {
  switch (status) {
    case "done":
      return { title: "Выполнен", color: "white" };
    case "inProgress":
      return { title: "Готовится", color: "cyan" };
    case "cancelled":
      return { title: "Отменен", color: "red" };
    default:
      return null;
  }
};

export const getUniqueIngredientsWithCount = (
  ingredients: string[],
): Record<string, number> => {
  return ingredients.reduce(
    (acc: Record<string, number>, current) => {
      acc[current] = acc[current] ? acc[current] + 1 : 1;
      return acc;
    },
    {} as Record<string, number>,
  );
};
