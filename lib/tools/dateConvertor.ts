export const dateConvertor = (value: Date) => {
  const date = new Date().toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    formatMatcher: "basic",
  });
  console.log(date);
  return date;
};
