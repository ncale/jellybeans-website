export async function GET() {
  console.log("running /api/price");
  const data = await getOPPrice();
  return Response.json({ price: data.data.price });
}

async function getOPPrice(): Promise<MobulaResponse> {
  const res = await fetch(
    "https://api.mobula.io/api/1/market/data?asset=0x4200000000000000000000000000000000000042&symbol=OP",
    { method: "GET", headers: { "content-type": "application/json" }, next: { revalidate: 86400 } },
  );
  if (!res.ok) {
    throw new Error(`HTTP Error! status: ${res.status}`);
  }

  const data = await res.json();
  if (!data) {
    throw new Error("No data");
  }

  return data;
}

type MobulaResponse = {
  data: {
    id: number;
    price: number;
    name: string;
    symbol: string;
    logo: string;
    contracts: [
      {
        address: "0x4200000000000000000000000000000000000042";
        blockchain: "Optimistic";
        blockchainId: "10";
        decimals: 18;
      },
    ];
  };
};
