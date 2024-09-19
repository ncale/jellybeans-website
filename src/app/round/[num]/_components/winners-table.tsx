"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { jellybeansAddress } from "@/constants/contracts";
import { JellybeansAbi } from "@/constants/JellybeansAbi";
import { useReadContract } from "wagmi";

export default function WinnersTable({ round }: { round: number }) {
  const {
    data: address,
    isLoading,
    isSuccess,
  } = useReadContract({
    abi: JellybeansAbi,
    address: jellybeansAddress,
    functionName: "winners",
    args: [BigInt(round), BigInt(0)],
  });

  if (isLoading) return <>Loading...</>;
  if (!isSuccess) return <>No data</>;

  return (
    <div className="space-y-1">
      <h3 className="font-medium">Winning Entries</h3>
      <Card className="bg-background px-2 py-3">
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{address.slice(0, 7)}...</TableCell>
                {/* <TableCell className="text-center font-medium">{Number(submission)}</TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
