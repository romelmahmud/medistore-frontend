"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { useUser } from "@/context/user.context";
import { dashboardRoutes } from "@/routes/dashboardRoutes";
import { Route } from "@/types";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { adminRoutes } from "@/routes/adminRoutes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LinkButton } from "../ui/link-button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setUser } = useUser();
  const router = useRouter();
  let routes: Route[] = [...dashboardRoutes];

  switch (user?.role) {
    case Roles.admin:
      routes = [...routes, ...adminRoutes];
      break;

    default:
      routes = [...dashboardRoutes];
      break;
  }
  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logging out successful", { id: toastId });
            setUser(null);
            router.push("/login");
          },
        },
      });
    } catch (error) {
      toast.error("Logging out failed", { id: toastId });
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <div className="flex items-center gap-2 p-4  mx-auto">
          <Link href="/" className="flex items-center ">
            <img src="/logo.png" alt="MediStore" className="h-8" />
            <span className="text-lg font-semibold tracking-tighter">
              MediStore
            </span>
          </Link>
        </div>
        <hr />

        {routes.map((item: Route) => (
          <SidebarMenu key={item.title} className="pl-4">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <LinkButton
                  href={item.url}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {item.title}
                </LinkButton>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>
      <hr className="my-1" />

      <div className="flex flex-col items-center justify-center p-4 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-10 h-10 cursor-pointer">
              {user?.image ? (
                <AvatarImage src={user?.image} alt={user.name} />
              ) : (
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p>{user?.name}</p>
        <p className="text-[12px]">{user?.email}</p>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
