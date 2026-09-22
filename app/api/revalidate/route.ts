import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminIdToken } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

// Optional server-side allow-list of browser origins permitted to call this
// endpoint. When unset, any origin is accepted because authorization is fully
// enforced by the Firebase ID token in the Authorization header (not by
// cookies), so cross-site browsers cannot forge a request.
const ALLOWED_ORIGINS = (process.env.REVALIDATE_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed =
    ALLOWED_ORIGINS.length === 0 || (origin && ALLOWED_ORIGINS.includes(origin))
      ? origin ?? "*"
      : null;

  if (!allowed) return {};

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    Vary: "Origin",
  };
}

export async function POST(request: NextRequest) {
  const headers = corsHeaders(request.headers.get("origin"));

  const authHeader = request.headers.get("authorization");
  const idToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : null;

  if (!idToken) {
    return NextResponse.json(
      { error: "Missing Firebase ID token" },
      { status: 401, headers }
    );
  }

  const result = await verifyAdminIdToken(idToken);

  if (!result.ok) {
    const status =
      result.reason === "not-configured"
        ? 500
        : result.reason === "invalid-token"
          ? 401
          : 403;
    return NextResponse.json(
      { error: "Unauthorized" },
      { status, headers }
    );
  }

  revalidatePath("/");

  return NextResponse.json({ revalidated: true }, { headers });
}

// CORS preflight for cross-origin POSTs from the Admin Portal.
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("origin")),
  });
}