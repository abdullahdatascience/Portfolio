import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

const ADMIN_EMAIL = "drabdullahumer@gmail.com";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoggedIn(!!user);
      // Refresh token FIRST to get latest claims (including email_verified)
      if (user?.email === ADMIN_EMAIL) {
        await user.getIdToken(true);
      }
      // Then check admin status with refreshed token
      setIsAdmin(!!user && user.email === ADMIN_EMAIL && user.emailVerified);
      setAuthChecked(true);
    });
    return unsubscribe;
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary/30 border-t-primary" />
      </div>
    );
  }

  if (isLoggedIn && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
          <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            This account is not authorized to access the admin portal.
          </p>
        </div>
        <button
          onClick={() => auth.signOut()}
          className="px-6 py-2.5 bg-card/70 border border-border/70 text-muted-foreground hover:text-foreground rounded-xl text-sm font-semibold transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return isLoggedIn ? (
    <AdminDashboard setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <AdminLogin setIsLoggedIn={setIsLoggedIn} />
  );
};

export default App;
