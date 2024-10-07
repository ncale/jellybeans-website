import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

/** FUNCTIONS & HELPERS */

// Constants
const IV_LENGTH = 32;

// Helpers
function decimalToHex(decimal: string): string {
  return BigInt(decimal).toString(16);
}

// Decryption
export function decrypt(compactData: string, secretKey: string): string {
  const ivDecimal = compactData.slice(0, IV_LENGTH);
  const encryptedDecimal = compactData.slice(IV_LENGTH);

  const ivHex = decimalToHex(ivDecimal);
  const encryptedHex = decimalToHex(encryptedDecimal);

  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    secretKey,
    Buffer.concat([iv, Buffer.alloc(4)]),
  );
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");

  return decrypted;
}

/** ENDPOINT */

const decryptSchema = z.object({
  compactData: z.string(),
  secretKey: z.string(),
});

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { compactData, secretKey } = decryptSchema.parse(body);

    const decryptedValue = decrypt(compactData, secretKey);

    return NextResponse.json({ decryptedValue });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
