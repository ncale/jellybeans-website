import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

/** FUNCTIONS & HELPERS */

// Constants
const IV_LENGTH = 32;
const MAX_ENCRYPTED_LENGTH = 32;

// Helpers
function hexToDecimal(hex: string): string {
  return BigInt(`0x${hex}`).toString(10);
}

// Encryption
const encrypt = (value: string, key: string): string => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-ctr", key, Buffer.concat([iv, Buffer.alloc(4)]));
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);

  const ivDecimal = hexToDecimal(iv.toString("hex"));
  const encryptedDecimal = hexToDecimal(encrypted.toString("hex"));

  return ivDecimal.padStart(IV_LENGTH, "0") + encryptedDecimal.padStart(MAX_ENCRYPTED_LENGTH, "0");
};

/** ENDPOINT */

const encryptSchema = z.object({
  round: z.number().int().positive().lt(1000),
  value: z.number().int().positive().lt(100_000_000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { value, round } = encryptSchema.parse(body);

    const key = process.env[`SECRET_KEY_ROUND_${round}`];
    if (!key) throw new Error("No key found");

    const compactData = encrypt(value.toString(), key);

    return NextResponse.json({ compactData });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
