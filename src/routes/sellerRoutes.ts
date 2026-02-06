import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Seller",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Dashboard",
        url: "/seller/dashboard",
      },
      {
        title: "Medicines",
        url: "/seller/medicines",
      },
      {
        title: "Orders",
        url: "/seller/orders",
      },
    ],
  },
];
