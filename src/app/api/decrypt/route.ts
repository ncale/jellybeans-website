import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

/** FUNCTIONS & HELPERS */

// Constants
const MAX_ENCRYPTED_LENGTH = 32;

// Helpers
function decimalToHex(decimal: string): string {
  return BigInt(decimal).toString(16);
}

// Decryption
export function decrypt(compactData: string, secretKey: string): string {
  const ivDecimal = compactData.slice(0, -MAX_ENCRYPTED_LENGTH);
  const encryptedDecimal = compactData.slice(-MAX_ENCRYPTED_LENGTH);

  const ivHex = decimalToHex(ivDecimal).padStart(32, "0");
  const encryptedHex = decimalToHex(encryptedDecimal).padStart(8, "0");

  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-ctr", secretKey, iv);
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

    const decrypted = decrypt(compactData, secretKey);

    return NextResponse.json({ decrypted });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
