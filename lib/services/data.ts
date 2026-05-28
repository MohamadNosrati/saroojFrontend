export async function getData<T>(url: string): Promise<T> {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}
