export const refactorDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "2-digit",
  });
};