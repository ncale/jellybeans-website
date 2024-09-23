import { getTokenPrice } from "@/lib/mobula";

export async function GET() {
  console.log("running /api/price/eth");
  const data = await getTokenPrice("ETH");
  return Response.json({ price: data.data.price });
}
