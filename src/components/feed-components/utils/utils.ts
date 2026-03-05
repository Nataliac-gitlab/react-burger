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
