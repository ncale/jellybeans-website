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

export default function LeaderboardTable() {
  return (
    <Table>
      <TableCaption>View all guesses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Guess</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">test</TableCell>
          <TableCell className="font-medium">test</TableCell>
          <TableCell className="font-medium">test</TableCell>
          <TableCell className="font-medium">test</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
