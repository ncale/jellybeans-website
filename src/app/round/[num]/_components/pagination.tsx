"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="flex items-center gap-x-2 text-sm">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-full"
        disabled={isPrevDisabled}
      >
        <Link href={`/round/${currentPage - 1}`}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-full"
        disabled={isNextDisabled}
      >
        <Link href={`/round/${currentPage + 1}`}>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Button>
      <span className="text-muted-foreground">Round {currentPage}</span>
    </div>
  );
}
