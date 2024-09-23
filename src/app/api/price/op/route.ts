import { getTokenPrice } from "@/lib/mobula";

export async function GET() {
  console.log("running /api/price/op");
  const data = await getTokenPrice("OP");
  return Response.json({ price: data.data.price });
}
