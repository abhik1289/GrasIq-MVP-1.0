"use client";

import React from "react";
import { authRoutes } from "../constraints/auth-routes";
import { usePathname } from "next/navigation";
// import DashboardLayout from "./dashboard-layout";
import DashboardLayout from "./dashboard-layout";
function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (authRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  if (pathname.includes("assessment-builder")) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

export default MainLayout;
