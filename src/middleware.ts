import { NextRequest, NextResponse } from "next/server";
import apiClient from "./lib/api";

export async function middleware(req: NextRequest) {
  const latestRoundNumber = await apiClient.getLatestRoundNumber();

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/round/${latestRoundNumber.id}`, req.url));
  }
  const res = NextResponse.next();
  return res;
}

export const config = {
  matcher: ["/"],
};
