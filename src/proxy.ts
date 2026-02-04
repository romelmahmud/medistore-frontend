import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { userService } from "./services/user.service";

export const proxy = async (req: NextRequest) => {
  const { data } = await userService.getSession();
  const { pathname } = req.nextUrl;

  if (!data) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = data.user.role;

  // Role-to-role smart redirects
  if (pathname.startsWith("/admin") && role === Roles.seller) {
    return NextResponse.redirect(new URL("/seller/dashboard", req.url));
  }

  if (pathname.startsWith("/seller") && role === Roles.admin) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // Admin & Seller guards
  if (pathname.startsWith("/admin") && role !== Roles.admin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/seller") && role !== Roles.seller) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Customer-only routes
  const customerRoutes = ["/cart", "/checkout", "/orders", "/profile"];
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
    "/admin/:path*",
    "/seller/:path*",
    "/cart",
    "/checkout",
    "/orders/:path*",
    "/profile",
  ],
};
