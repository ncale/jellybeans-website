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
import { BLOCKSCOUT_BASE_URL, DUNE_SUBMISSIONS_URL } from "@/constants/links";
import apiClient from "@/lib/api";
import { formatSeconds } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";

export default function RecentSubmissions({ round }: { round: number }) {
  return (
    <div className="space-y-1">
      <h3 className="font-medium">Recent Submissions</h3>
      <Table className="text-muted-foreground">
        <TableCaption>
          <a
            href={DUNE_SUBMISSIONS_URL}
            target="_blank"
            className="mx-auto flex w-fit items-center gap-x-1.5 hover:underline"
          >
            <p>View all guesses</p>
            <ExternalLink className="h-3 w-3" />
          </a>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-28 text-center font-semibold">Time</TableHead>
            <TableHead className="font-semibold">Address</TableHead>
            <TableHead className="w-16 text-center font-semibold">Guess</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <RecentSubmissionsList round={round} />
        </TableBody>
      </Table>
    </div>
  );
}

function RecentSubmissionsList({ round }: { round: number }) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["recent-submissions", round],
    queryFn: () => apiClient.getRecentSubmissions(round),
    staleTime: 1000 * 60 * 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={4} className="text-center">
          Loading...
        </TableCell>
      </TableRow>
    );
  }
  if (!isSuccess) {
    return (
      <TableRow>
        <TableCell colSpan={4} className="text-center">
          No entries yet!
        </TableCell>
      </TableRow>
    );
  }

  return data.submissions.items.map((sub) => (
    <TableRow key={sub.txnHash}>
      <TableCell className="py-1 text-center font-medium">
        {formatSeconds(BigInt(Math.floor(Date.now() / 1000)) - BigInt(sub.timestamp)).split(" ")[0]}{" "}
        ago
      </TableCell>
      <TableCell className="py-1 font-medium">
        <Submitter address={sub.submitter} />
      </TableCell>
      <TableCell className="py-1 text-center font-medium">
        {Number(sub.entry).toLocaleString()}
      </TableCell>
      <TableCell className="py-1">
        <a
          href={`${BLOCKSCOUT_BASE_URL}tx/${sub.txnHash}`}
          target="_blank"
          className="flex h-full w-full justify-center"
        >
          <ExternalLink className="h-3 w-3" />
        </a>
      </TableCell>
    </TableRow>
  ));
}

function Submitter({ address }: { address: string }) {
  const { data, isLoading, isSuccess } = useQuery<EnsData>({
    queryKey: ["ens-lookup", address],
    queryFn: () => fetch(`https://api.ensdata.net/${address}`).then((res) => res.json()),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  if (isLoading) return <>{address.slice(0, 7)}...</>;
  if (!isSuccess) return <>{address.slice(0, 7)}...</>;
  return <>{data.ens_primary}</>;
}

type EnsData = {
  address: string;
  contentHash: null;
  ens: string;
  ens_primary: string;
  resolverAddress: string;
  wallets: {
    eth: string;
  };
};
