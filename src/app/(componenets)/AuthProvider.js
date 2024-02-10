// we have make this for our client site pages
"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return <SessionProvider> {children} </SessionProvider>;
};

export default AuthProvider;
