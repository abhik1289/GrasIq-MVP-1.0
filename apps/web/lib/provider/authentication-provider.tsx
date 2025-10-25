"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AuthenticationProvider({ children }: { children: React.ReactNode }) {
  const AUTH_ROUTES = ["/sign-in", "/forgot-password", "/accept-invite"];

  const { data: session, status } = useSession();

  const router = useRouter();
console.log(status,session)
  useEffect(() => {
    if (
      status === "authenticated" &&
      AUTH_ROUTES.includes(window.location.pathname)
    ) {
      router.back();
    } else if (
      status === "unauthenticated" &&
      !AUTH_ROUTES.includes(window.location.pathname)
    ) {
      router.push("/sign-in");
    }
  });

  return <div>{children}</div>;
}

export default AuthenticationProvider;