export async function getTokenPrice(token: "OP" | "ETH"): Promise<MobulaResponse> {
  const apiKey = process.env.MOBULA_API_KEY;
  if (!apiKey) throw new Error("Missing mobula api key");

  const res = await fetch(`https://api.mobula.io/api/1/market/data?symbol=${token}`, {
    method: "GET",
    headers: { "content-type": "application/json", Authorization: apiKey },
    next: { revalidate: 86400 },
  });
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
