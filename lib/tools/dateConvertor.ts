export const dateConvertor = (timestamp: number | string | Date) => {
  return new Date(timestamp).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    formatMatcher: "basic",
  });
};