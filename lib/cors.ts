// lib/cors.ts
import { NextRequest, NextResponse } from "next/server";

const allowedOrigin = ["https://testlab-rouge.vercel.app","http://localhost:3000"]; // ✅ change to your frontend domain

export function corsMiddleware(req: NextRequest) {
    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");
  
    // Fallback: use request URL if headers are missing
    const requestOrigin = origin || (referer ? new URL(referer).origin : req.nextUrl.origin);

  if (!allowedOrigin.includes(requestOrigin??'')) {
    return NextResponse.json({ error: "Not allowed by CORS" }, { status: 403 });
  }


  const validOrigin = allowedOrigin.join(", ");

  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", validOrigin);
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, x-api-key");
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.ALLOWED_API_KEY) {
    return NextResponse.json({ error: "Forbidden: Invalid API key" }, { status: 403 });
  }

  return res;
}