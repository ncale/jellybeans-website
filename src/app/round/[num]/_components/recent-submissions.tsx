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
import { BLOCKSCOUT_BASE_URL, DUNE_SUBMISSIONS_URL } from "@/constants/data";
import apiClient from "@/lib/api";
import { formatSeconds } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";

export default function RecentSubmissions({ round }: { round: number }) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["recent-submissions", round],
    queryFn: () => apiClient.getRecentSubmissions(round),
  });

  return (
    <RecentSubmissionsTable>
      {isLoading && (
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            Loading...
          </TableCell>
        </TableRow>
      )}
      {(!isSuccess || data.submissions.items.length === 0) && (
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            No entries yet!
          </TableCell>
        </TableRow>
      )}
      {isSuccess &&
        data.submissions.items.map((sub) => (
          <TableRow key={sub.txnHash}>
            <TableCell className="py-1 text-center font-medium">
              {
                formatSeconds(BigInt(Math.floor(Date.now() / 1000)) - BigInt(sub.timestamp)).split(
                  " ",
                )[0]
              }{" "}
              ago
            </TableCell>
            <TableCell className="py-1 font-medium">{sub.submitter.slice(0, 7)}...</TableCell>
            <TableCell className="py-1 text-center font-medium">{sub.entry}</TableCell>
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
        ))}
    </RecentSubmissionsTable>
  );
}

function RecentSubmissionsTable({ children }: { children: React.ReactNode }) {
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
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
}
