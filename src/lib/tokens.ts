import { BASE_URL } from "@/constants/links";

type Tokens = {
  id: bigint;
  name: string;
  description: string;
  collection: string;
  round: number;
  image: string;
  traits: [{ trait_type: "name"; value: string }, { trait_type: "project"; value: string }];
  artist: string;
  blockchain: string;
  token_standard: string;
  external_url: string;
};

export const tokens: Tokens[] = [
  {
    id: BigInt(1),
    name: "Jelly Beans Round 1",
    description: "This token represents a prediction in Round 1 of Jelly Beans",
    collection: "jellybeans",
    round: 1,
    image: `${BASE_URL}token-images/1.png`,
    traits: [
      { trait_type: "name", value: "Remy" },
      { trait_type: "project", value: "ENS" },
    ],
    artist: "Onchain Clarity Co.",
    blockchain: "OP Mainnet",
    token_standard: "ERC-1155",
    external_url: `${BASE_URL}round/1`,
  },
  {
    id: BigInt(2),
    name: "Jelly Beans Round 2",
    description: "This token represents a prediction in Round 2 of Jelly Beans",
    collection: "jellybeans",
    round: 2,
    image: `${BASE_URL}token-images/2.png`,
    traits: [
      { trait_type: "name", value: "Mabel" },
      { trait_type: "project", value: "Farcaster" },
    ],
    artist: "Onchain Clarity Co",
    blockchain: "OP Mainnet",
    token_standard: "ERC-1155",
    external_url: `${BASE_URL}round/2`,
  },
  {
    id: BigInt(3),
    name: "Jelly Beans Round 3",
    description: "This token represents a prediction in Round 3 of Jelly Beans",
    collection: "jellybeans",
    round: 3,
    image: `${BASE_URL}token-images/3.png`,
    traits: [
      { trait_type: "name", value: "Wanda" },
      { trait_type: "project", value: "Optimism" },
    ],
    artist: "Onchain Clarity Co",
    blockchain: "OP Mainnet",
    token_standard: "ERC-1155",
    external_url: `${BASE_URL}round/3`,
  },
];
