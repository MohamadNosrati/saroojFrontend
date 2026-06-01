import { AUTH_COOKIE_KEY } from "@/lib/constants/user";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get(AUTH_COOKIE_KEY)?.value

  return Response.json(token);
}