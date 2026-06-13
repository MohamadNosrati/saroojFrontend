export const dateConvertor = (timestamp: number | string | Date) => {
  return new Date(timestamp).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    formatMatcher: "basic",
  });
};

export const timeConvertor = (timestamp: number | string | Date) => {
  return new Date(timestamp).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
