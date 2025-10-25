"use client";

import { useUser } from "@/features/user-profile/api/useProfile";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { authRoutes } from "@/lib/constraints/auth-routes";
// import api from "@/lib/axios-instance";
import { useSession } from "next-auth/react";
function UserAuthentication({
  children,
}: Readonly<{ children: React.ReactNode }>) {

const { data: user, status } = useSession();
 console.log(user)

  return <>{children}</>;
}

export default UserAuthentication;
