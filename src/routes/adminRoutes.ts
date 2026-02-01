import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin",
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
      },
      {
        title: "Users",
        url: "/admin/users",
      },
      {
        title: "Orders",
        url: "/admin/orders",
      },
      {
        title: "Categories",
        url: "/admin/categories",
      },
    ],
  },
];
