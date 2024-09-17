"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { jellybeansAddress } from "@/constants/contracts";
import { JellybeansABI } from "@/constants/JellybeansABI";
import { ExternalLink } from "lucide-react";
import { useReadContract } from "wagmi";

const TESTNET_OPSCAN_URL = `https://sepolia-optimism.etherscan.io/address/${jellybeansAddress}`;
// const OPSCAN_URL = `https://mainnet-optimism.etherscan.io/address/${jellybeansAddress}`;
const DUNE_SUBMISSIONS_URL = "https://dune.com/";

export default function LeaderboardTable({ round }: { round: number }) {
  const { data, isLoading, isSuccess } = useReadContract({
    abi: JellybeansABI,
    address: jellybeansAddress,
    functionName: "submissions",
    args: [BigInt(round), BigInt(1)],
  });

  if (isLoading) return <>Loading...</>;
  if (!isSuccess) return <>Loading...</>;

  const [address, submission] = data;

  return (
    <div className="space-y-1">
      <a
        href={TESTNET_OPSCAN_URL}
        target="_blank"
        className="flex w-fit origin-left items-center gap-x-1 hover:underline"
      >
        <h3 className="font-medium">Predictions</h3>
        <ExternalLink className="h-3 w-3" />
      </a>
      <Table>
        <TableCaption>
          <a
            href={DUNE_SUBMISSIONS_URL}
            target="_blank"
            className="mx-auto flex w-fit items-center gap-x-1 hover:underline"
          >
            <p>View all guesses</p>
            <ExternalLink className="h-3 w-3" />
          </a>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20 text-center">Time</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="w-24 text-center">Guess</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center font-medium"></TableCell>
            <TableCell className="font-medium">{address.slice(0, 7)}...</TableCell>
            <TableCell className="text-center font-medium">{Number(submission)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
