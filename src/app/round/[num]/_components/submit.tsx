"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatEther } from "viem";

export default function Submit({ feeAmount }: { feeAmount: bigint }) {
  return (
    <form className="">
      <div className="flex gap-x-2 font-bold text-md">
        <Input placeholder="Enter a number" />
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </div>
      <label className="text-xs mt-1 text-muted-foreground">
        * Submitting a guess requires a {formatEther(feeAmount)} ETH fee
      </label>
    </form>
  );
}
