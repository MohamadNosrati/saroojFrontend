import { cookies } from "next/headers";

import { AUTH_COOKIE_KEY } from "@/lib/constants/user";

export async function GET() {
  const token = (await cookies()).get(AUTH_COOKIE_KEY)?.value;

  return Response.json(token);
}
