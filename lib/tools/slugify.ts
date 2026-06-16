export function slugify(text: string) {
  console.log("text", text);

  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // spaces -> -
    .replace(/[^\u0600-\u06FFa-z0-9-]/g, "") // remove invalid chars
    .replace(/-+/g, "-"); // remove duplicate -
}
