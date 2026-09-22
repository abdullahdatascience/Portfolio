import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase (singleton-safe for multiple imports)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Services
export const db   = getFirestore(app);
export const auth = getAuth(app);

// NOTE: GoogleAuthProvider and Storage are intentionally omitted — they are
// not used by the frontend portfolio. Add them back when those features ship.
//
// NOTE: Firebase Analytics is intentionally removed. Its initialization was
// the sole trigger of Firebase Installations requests; it failed because the
// CSP connect-src did not include firebaseinstallations.googleapis.com, and
// no part of the application ever consumed the analytics instance. Firestore
// and Auth do not use Firebase Installations.
