import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { env } from "./env";

// Force dynamic rendering because we're reading cookies
export const dynamic = "force-dynamic";

export const proxy = async (req: NextRequest) => {
  // Read the httpOnly cookie from the incoming request
  const sessionToken = req.cookies.get("better-auth.session_token")?.value;

  // If no token → redirect to login
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Fetch session from backend using the token
  const res = await fetch(`${env.NEXT_PUBLIC_AUTH_URL}/api/auth/get-session`, {
    headers: {
      Cookie: `better-auth.session_token=${sessionToken}`, // forward token
    },
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  // If no session returned → redirect to login
  if (!data || !data.user) {
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

// Which routes the middleware applies to
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
