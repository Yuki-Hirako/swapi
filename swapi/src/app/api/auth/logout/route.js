import { NextResponse } from "next/server";

export async function GET(request) {
  const baseURL = "https://swapi-orcin.vercel.app";
  const redirectURL = new URL("/auth", baseURL);

  return NextResponse.redirect(redirectURL.toString(), {
    headers: {
      "Set-Cookie": "token=; Path=/; max-age=0",
    },
  });
}
