"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { LinkButton } from "./link-button";

interface PaginationControlsProps {
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}

export default function PaginationControls({ meta }: PaginationControlsProps) {
  const { limit: pageSize, page: currentPage, total, totalPages } = meta;
  const searchParams = useSearchParams();

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex items-center justify-between px-2 py-4 mt-4">
      <div className="text-sm text-muted-foreground">
        Showing {start} to {end} of {total} results
      </div>

      <div className="flex items-center space-x-2">
        {/* First */}
        <LinkButton
          href={buildPageHref(1)}
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </LinkButton>

        {/* Previous */}
        <LinkButton
          href={buildPageHref(currentPage - 1)}
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </LinkButton>

        <span className="text-sm font-medium px-2">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next */}
        <LinkButton
          href={buildPageHref(currentPage + 1)}
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </LinkButton>

        {/* Last */}
        <LinkButton
          href={buildPageHref(totalPages)}
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </LinkButton>
      </div>
    </div>
  );
}
