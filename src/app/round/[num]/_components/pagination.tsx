"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Pagination({ currentPage }: { currentPage: number }) {
  return (
    <div className="flex items-center text-sm gap-x-2">
      <Button
        variant="outline"
        size="icon"
        className="w-5 h-5 rounded-full"
        disabled
        asChild
      >
        <Link href={`/round/${currentPage - 1}`}>
          <ArrowLeft />
        </Link>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="w-5 h-5 rounded-full"
        disabled
        asChild
      >
        <Link href={`/round/${currentPage + 1}`}>
          <ArrowRight />
        </Link>
      </Button>
      <span className="text-muted-foreground">Round {currentPage}</span>
    </div>
  );
}
