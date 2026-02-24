import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export async function requireRole(allowedRoles: string[]) {
  const { data: sessionData } = await userService.getSession();
  const userRole = sessionData?.user?.role;

  if (!sessionData || !allowedRoles.includes(userRole)) {
    redirect("/");
  }
  return sessionData;
}
