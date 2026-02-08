"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { useState, useTransition } from "react";
interface LinkButtonProps extends ComponentProps<typeof Button> {
  href: string;
  children: React.ReactNode;
  external?: boolean; // true if it's an external link
}

export function LinkButton({
  href,
  children,
  external = false,
  ...props
}: LinkButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [active, setActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (external) return; // allow default behavior for external links
    e.preventDefault();

    if (pathname === href) return; // Already on this page

    setActive(true);
    startTransition(() => {
      router.push(href);
      setActive(false); // auto-clear after navigation
    });
  };

  // Internal navigation button
  if (!external) {
    return (
      <Button
        onClick={handleClick}
        disabled={isPending || active}
        className="flex items-center gap-2"
        {...props}
      >
        {(isPending || active) && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </Button>
    );
  }

  // External link button
  return (
    <Button asChild className="flex items-center gap-2" {...props}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  );
}
