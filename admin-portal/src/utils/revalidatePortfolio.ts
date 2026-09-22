// Reusable on-demand revalidation for the public portfolio.
//
// After a successful Firestore mutation, call revalidatePortfolio() (or
// revalidatePortfolioWithNotify()) so the Next.js portfolio's cached home page
// is invalidated immediately instead of waiting for time-based ISR.
//
// Security: the request carries the signed-in admin's Firebase ID token in the
// Authorization header. The Next.js server verifies it with the Firebase Admin
// SDK before revalidating. No secret ever lives in this (browser) bundle.
//
// Revalidation is a secondary operation: failures are logged, never thrown,
// and never roll back the Firestore write.

import { auth } from "../firebase";

export type RevalidationStatus = "skipped" | "ok" | "failed";

type NotifyFn = (text: string, type: "success" | "error") => void;

const PORTFOLIO_ORIGIN = (process.env.REACT_APP_PORTFOLIO_URL ?? "")
  .trim()
  .replace(/\/+$/, "");

export async function revalidatePortfolio(): Promise<RevalidationStatus> {
  if (!PORTFOLIO_ORIGIN) {
    console.warn(
      "[revalidate] REACT_APP_PORTFOLIO_URL is not set; live site refresh was skipped."
    );
    return "skipped";
  }

  const user = auth.currentUser;
  if (!user) {
    console.warn(
      "[revalidate] No signed-in user; live site refresh was skipped."
    );
    return "skipped";
  }

  try {
    const idToken = await user.getIdToken(true);
    const response = await fetch(`${PORTFOLIO_ORIGIN}/api/revalidate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      console.error(
        `[revalidate] Live site refresh failed (HTTP ${response.status}).`
      );
      return "failed";
    }

    return "ok";
  } catch (err) {
    console.error("[revalidate] Live site refresh request failed:", err);
    return "failed";
  }
}

// Fires the existing success notification immediately (non-blocking), then
// shows a non-blocking "delayed" warning if the revalidation request fails so
// the user is never told a save failed when it actually succeeded.
export async function revalidatePortfolioWithNotify(
  notify: NotifyFn,
  successMessage: string
): Promise<void> {
  notify(successMessage, "success");
  const status = await revalidatePortfolio();
  if (status === "failed") {
    notify(`${successMessage} — live site refresh is delayed.`, "success");
  }
}