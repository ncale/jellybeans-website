import { NextRequest, NextResponse } from "next/server";
import { type Hex } from "viem";
import { fromHex } from "viem/utils";
import z from "zod";

import { tokens } from "@/lib/tokens";

const schema = z.object({
  id: z.string(),
});

export async function GET(req: NextRequest, { params }: { params: [key: string] }) {
  const safeParse = schema.safeParse(params);

  if (!safeParse.success) {
    return NextResponse.json(safeParse.error, { status: 400 });
  }

  let idBigint: bigint;
  const { id } = safeParse.data;

  if (id.match(/^\d+$/)) {
    idBigint = BigInt(id);
  } else {
    idBigint = fromHex(("0x" + id) as Hex, "bigint");
  }

  const token = tokens.find((token) => token.id === idBigint);

  if (!token) {
    return NextResponse.json({ error: "Token not found" }, { status: 404 });
  }

  const metadata = {
    ...token,
    id: token.id.toString(),
  };

  return NextResponse.json(metadata);
}
