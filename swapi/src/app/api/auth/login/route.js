import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  const baseURL = "https://swapi-orcin.vercel.app";
  const redirectURL = new URL("/dashboard/home", baseURL);

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30 * 12;

  return NextResponse.redirect(redirectURL.toString(), {
    headers: {
      "Set-Cookie": `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  });
}
