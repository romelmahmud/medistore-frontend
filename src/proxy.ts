import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { userService } from "./services/user.service";

export const proxy = async (req: NextRequest) => {
  const { data } = await userService.getSession();
  const { pathname } = req.nextUrl;

  if (!data) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (data && pathname.startsWith("/profile")) {
    return NextResponse.next();
  }

  const role = data.user.role;

  // Admin & Seller guards
  if (
    pathname.startsWith("/dashboard") &&
    role !== Roles.admin &&
    role !== Roles.seller
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Customer-only routes
  const customerRoutes = ["/cart", "/checkout", "/orders"];
  const isCustomerRoute = customerRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isCustomerRoute && role !== Roles.customer) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/profile/:path*",
  ],
};
