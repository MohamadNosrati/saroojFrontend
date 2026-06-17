export const getCustomCookie = async () => {
  const res = await fetch("/api/cookie");
  const data = await res.json();
};
