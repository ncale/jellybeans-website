"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableRow } from "@/components/ui/table";
import { BLOCKSCOUT_BASE_URL } from "@/constants/data";
import { PastRoundData } from "@/lib/types";
import { ExternalLink } from "lucide-react";

export default function WinnersTable({ data }: { data: PastRoundData }) {
  return (
    <div className="space-y-1">
      <h3 className="font-medium">Winning Entries</h3>
      <Card className="bg-background px-2 py-3">
        <CardContent>
          <Table>
            <TableCaption>
              <a
                href={`${BLOCKSCOUT_BASE_URL}tx/${data.setCorrectAnswerTxnHash}`}
                target="_blank"
                className="mx-auto flex w-fit items-center gap-x-1.5 hover:underline"
              >
                <p>See resolution txn</p>
                <ExternalLink className="h-3 w-3" />
              </a>
            </TableCaption>
            <TableBody>
              {data.winners.map((winner, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{winner.slice(0, 12)}...</TableCell>
                  <TableCell className="text-right font-medium">
                    {data.winningAnswer.toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
