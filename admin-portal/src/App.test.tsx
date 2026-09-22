import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "./App";

let mockAuthCallback: ((user: any) => void) | null = null;

jest.mock("firebase/auth", () => {
  const orig = jest.requireActual("firebase/auth");
  return {
    ...orig,
    onAuthStateChanged: (_auth: unknown, cb: (user: any) => void) => {
      mockAuthCallback = cb;
      return jest.fn();
    },
    signInWithEmailAndPassword: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
  };
});

jest.mock("./firebase", () => ({
  auth: {
    signOut: jest.fn().mockResolvedValue(undefined),
  },
  db: {},
}));

describe("App — authentication flow", () => {
  jest.setTimeout(15000);
  beforeEach(() => {
    mockAuthCallback = null;
  });

  const resolveAuth = (user: { email: string; emailVerified: boolean } | null) => {
    act(() => {
      mockAuthCallback!(user);
    });
  };

  it("shows a branded loading screen while Firebase auth state resolves", () => {
    render(<App />);
    expect(document.querySelector(".animate-spin")).toBeTruthy();
    expect(screen.queryByText("Access Admin Panel")).not.toBeInTheDocument();
  });

  it("shows the login page when no user is authenticated", () => {
    render(<App />);
    resolveAuth(null);
    expect(screen.getByText("Secure Portal")).toBeInTheDocument();
    expect(screen.getByText("Access Admin Panel")).toBeInTheDocument();
  });

  it("blocks an authenticated non-admin user with access denied", () => {
    render(<App />);
    resolveAuth({ email: "someone@else.com", emailVerified: true });
    expect(screen.getByText("Access Denied")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("blocks an unverified account even with the admin email", () => {
    render(<App />);
    resolveAuth({ email: "drabdullahumer@gmail.com", emailVerified: false });
    expect(screen.getByText("Access Denied")).toBeInTheDocument();
  });

  it("renders the admin dashboard for the verified admin identity", async () => {
    render(<App />);
    resolveAuth({ email: "drabdullahumer@gmail.com", emailVerified: true });
    expect(screen.getByText("Admin Portal")).toBeInTheDocument();
    expect(screen.getByText("Muhammad Abdullah")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /admin sections/i })).toBeInTheDocument();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });
});