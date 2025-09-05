// lib/auth/requireAuth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function requireAuth(): Promise<
  | { success: true; session: Awaited<ReturnType<typeof getServerSession>> }
  | { success: false; response: NextResponse }
> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { success: true, session };
}