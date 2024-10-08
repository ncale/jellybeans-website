"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableRow } from "@/components/ui/table";
import UserText from "@/components/user-text";
import { BLOCKSCOUT_BASE_URL } from "@/constants/links";
import { PastRoundData } from "@/lib/types";
import { ExternalLink } from "lucide-react";

export default function WinnersTable({ data }: { data: PastRoundData }) {
  return (
    <div className="mt-4 space-y-1">
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
              {data.winners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center font-medium">
                    n/a
                  </TableCell>
                </TableRow>
              ) : (
                data.winners.map((winner, i) => (
                  <TableRow key={`winner-${i}`}>
                    <TableCell className="font-medium">
                      <UserText address={winner} />
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {data.winningAnswer.toString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
