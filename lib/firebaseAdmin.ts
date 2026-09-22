// Server-only Firebase Admin SDK helper used by the blog/portfolio
// revalidation route. Verifies the admin's Firebase ID token so that only the
// authorized, email-verified admin can trigger on-demand revalidation.
//
// This module MUST only ever be imported from server code (Route Handlers,
// Server Components, Server Actions). It reads non-public environment
// variables and is never bundled to the client.

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";

// Mirrors the admin identity enforced in firestore.rules isAdmin().
const ADMIN_EMAIL = "drabdullahumer@gmail.com";

let adminApp: App | null = null;

function getFirebaseAdminApp(): App {
  if (adminApp) return adminApp;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin SDK is not configured. Set FIREBASE_PROJECT_ID, " +
        "FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
    );
  }

  const existing =
    getApps().find((app) => app.name === "[DEFAULT]") ?? getApps()[0];

  adminApp =
    existing ??
    initializeApp(
      {
        credential: cert({
          projectId,
          clientEmail,
          // Service-account private keys are stored with literal "\n" escapes
          // in env vars; decode them into real newlines.
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
        projectId,
      },
      "revalidate-admin"
    );

  return adminApp;
}

export type TokenVerificationResult =
  | { ok: true; uid: string }
  | { ok: false; reason: "not-configured" | "invalid-token" | "not-authorized" };

// Verifies the Firebase ID token and confirms the caller is the authorized
// admin with a verified email. Returns a discriminated result instead of
// throwing for expected failures.
export async function verifyAdminIdToken(
  idToken: string
): Promise<TokenVerificationResult> {
  let app: App;
  try {
    app = getFirebaseAdminApp();
  } catch {
    return { ok: false, reason: "not-configured" };
  }

  let decoded: DecodedIdToken;
  try {
    decoded = await getAuth(app).verifyIdToken(idToken);
  } catch (err) {
    console.error("[revalidate] Failed to verify Firebase ID token:", err);
    return { ok: false, reason: "invalid-token" };
  }

  if (decoded.email !== ADMIN_EMAIL || decoded.email_verified !== true) {
    console.warn(
      `[revalidate] Rejected token for uid=${decoded.uid} email=${decoded.email ?? "unknown"} email_verified=${decoded.email_verified}`
    );
    return { ok: false, reason: "not-authorized" };
  }

  return { ok: true, uid: decoded.uid };
}