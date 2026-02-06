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
        title: "Add Medicine",
        url: "/seller/medicines/add-medicine",
      },
      {
        title: "Orders",
        url: "/seller/orders",
      },
    ],
  },
];
