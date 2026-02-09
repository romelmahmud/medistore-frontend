"use client";

import { Accordion } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Roles } from "@/constants/roles";
import { useUser } from "@/context/user.context";
import { authClient } from "@/lib/auth-client";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CartButton from "../modules/shop/cart-trigger-button";
import { LinkButton } from "../ui/link-button";
import { ModeToggle } from "./ModeTogle";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  menu?: MenuItem[];
}

export default function Navbar({
  menu = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Shop", url: "/shop" },
  ],
}: NavbarProps) {
  const { user, setUser } = useUser();
  const isDashboardUser =
    user?.role === Roles.admin || user?.role === Roles.seller;
  const userRole = user?.role?.toLowerCase();

  const router = useRouter();

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
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo + Desktop Menu */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="MediStore" className="h-8" />
            <span className="text-lg font-semibold tracking-tighter">
              MediStore
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-4 items-center">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-muted hover:text-accent-foreground"
              >
                {item.title}
              </Link>
            ))}

            {/* Dashboard Link only for Admin/Seller */}
            {isDashboardUser && (
              <LinkButton
                href="/dashboard"
                className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer"
              >
                Dashboard
              </LinkButton>
            )}
          </div>
        </div>

        {/* Right Side: Auth / Avatar / ModeToggle */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {!user ? (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              <CartButton />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-10 h-10 cursor-pointer">
                    {user?.image ? (
                      <AvatarImage src={user?.image} alt={user.name} />
                    ) : (
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <Image
                        height={40}
                        width={40}
                        src="/logo.png"
                        alt="MediStore"
                        className="h-8"
                      />
                      MediStore
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 mt-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex flex-col gap-2"
                  >
                    {menu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className="text-md font-semibold"
                      >
                        {item.title}
                      </Link>
                    ))}
                    {userRole && (
                      <Link
                        href={`/${user?.role}/dashboard`}
                        className="text-md font-semibold text-accent"
                      >
                        Dashboard
                      </Link>
                    )}
                  </Accordion>

                  <div className="mt-4 flex flex-col gap-2">
                    {!user ? (
                      <>
                        <Button asChild variant="outline">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/register">Sign Up</Link>
                        </Button>
                      </>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">Account</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <Link href="/profile">Profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={handleLogout}>
                            Logout
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
