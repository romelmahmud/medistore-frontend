import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { env } from "./env";

export const proxy = async (req: NextRequest) => {
  // Read cookie directly from the request
  const sessionToken = req.cookies.get("better-auth.session_token")?.value;

  // If no cookie → redirect to login
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Optionally, fetch session data from backend using the token
  const res = await fetch(`${env.NEXT_PUBLIC_AUTH_URL}/api/auth/get-session`, {
    headers: {
      Cookie: `better-auth.session_token=${sessionToken}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!data) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { pathname } = req.nextUrl;
  const role = data.user.role;

  // Admin & Seller guards
  if (
    pathname.startsWith("/dashboard") &&
    role !== Roles.admin &&
    role !== Roles.seller
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Admin-only routes
  const adminRoutes = ["/dashboard/users", "/dashboard/categories"];
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  if (isAdminRoute && role !== Roles.admin) {
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
    "/checkout/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/dashboard/users/:path*",
    "/dashboard/categories/:path*",
  ],
};
