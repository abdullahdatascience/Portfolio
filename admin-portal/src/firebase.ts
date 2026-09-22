import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase config — reads environment variables with inline fallbacks for
// standalone development. The admin portal shares the same Firebase project
// as the public portfolio.
const firebaseConfig = {
  apiKey:            process.env.REACT_APP_FIREBASE_API_KEY            ?? "AIzaSyCWwlOGaXO5nwAjk1IGi_OLcSjgQxTFGxA",
  authDomain:        process.env.REACT_APP_FIREBASE_AUTH_DOMAIN        ?? "my-portfolio-admin-8deea.firebaseapp.com",
  projectId:         process.env.REACT_APP_FIREBASE_PROJECT_ID         ?? "my-portfolio-admin-8deea",
  storageBucket:     process.env.REACT_APP_FIREBASE_STORAGE_BUCKET     ?? "my-portfolio-admin-8deea.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ?? "933116918873",
  appId:             process.env.REACT_APP_FIREBASE_APP_ID             ?? "1:933116918873:web:5b6a1b3a971096f9c1c548",
  measurementId:     process.env.REACT_APP_FIREBASE_MEASUREMENT_ID     ?? "G-0N0GX9XLRG",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db   = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
