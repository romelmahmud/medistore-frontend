"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { useTransition } from "react";

interface LinkButtonProps extends ComponentProps<typeof Button> {
  href: string;
  external?: boolean;
}

export function LinkButton({
  href,
  children,
  external = false,
  disabled,
  ...props
}: LinkButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (external) return;
    e.preventDefault();

    if (pathname === href) return;

    startTransition(() => {
      router.push(href);
    });
  };

  // 🌐 External link
  if (external) {
    return (
      <Button asChild {...props}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }

  // 🔗 Internal navigation
  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isPending}
      aria-busy={isPending}
      className="flex items-center justify-center gap-2"
      {...props}
    >
      {isPending && props.size === "icon" ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {children}
        </>
      )}
    </Button>
  );
}
