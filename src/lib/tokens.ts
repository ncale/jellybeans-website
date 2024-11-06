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
  {
    id: BigInt(4),
    name: "Jelly Beans Round 4",
    description: "This token represents a prediction in Round 4 of Jelly Beans",
    collection: "jellybeans",
    round: 4,
    image: `${BASE_URL}token-images/4.png`,
    traits: [
      { trait_type: "name", value: "Sam" },
      { trait_type: "project", value: "Polymarket" },
    ],
    artist: "Onchain Clarity Co",
    blockchain: "OP Mainnet",
    token_standard: "ERC-1155",
    external_url: `${BASE_URL}round/4`,
  },
  {
    id: BigInt(5),
    name: "Jelly Beans Round 5",
    description: "This token represents a prediction in Round 5 of Jelly Beans",
    collection: "jellybeans",
    round: 5,
    image: `${BASE_URL}token-images/5.png`,
    traits: [
      { trait_type: "name", value: "Hugo" },
      { trait_type: "project", value: "pump.fun" },
    ],
    artist: "Onchain Clarity Co",
    blockchain: "OP Mainnet",
    token_standard: "ERC-1155",
    external_url: `${BASE_URL}round/5`,
  },
  {
    id: BigInt(6),
    name: "Jelly Beans Round 6",
    description: "This token represents a prediction in Round 6 of Jelly Beans",
    collection: "jellybeans",
    round: 6,
    image: `${BASE_URL}token-images/6.png`,
    traits: [
      { trait_type: "name", value: "Chester" },
      { trait_type: "project", value: "Layer3" },
    ],
    artist: "Onchain Clarity Co",
    blockchain: "OP Mainnet",
    token_standard: "ERC-1155",
    external_url: `${BASE_URL}round/6`,
  },
  {
    id: BigInt(7),
    name: "Jelly Beans Round 7",
    description: "This token represents a prediction in Round 7 of Jelly Beans",
    collection: "jellybeans",
    round: 7,
    image: `${BASE_URL}token-images/7.png`,
    traits: [
      { trait_type: "name", value: "Remy" },
      { trait_type: "project", value: "EFP" },
    ],
    artist: "Onchain Clarity Co",
    blockchain: "OP Mainnet",
    token_standard: "ERC-1155",
    external_url: `${BASE_URL}round/7`,
  },
  {
    id: BigInt(8),
    name: "Jelly Beans Round 8",
    description: "This token represents a prediction in Round 8 of Jelly Beans",
    collection: "jellybeans",
    round: 8,
    image: `${BASE_URL}token-images/8.png`,
    traits: [
      { trait_type: "name", value: "Mabel" },
      { trait_type: "project", value: "Ethereum" },
    ],
    artist: "Onchain Clarity Co",
    blockchain: "OP Mainnet",
    token_standard: "ERC-1155",
    external_url: `${BASE_URL}round/8`,
  },
  {
    id: BigInt(9),
    name: "Jelly Beans Round 9",
    description: "This token represents a prediction in Round 9 of Jelly Beans",
    collection: "jellybeans",
    round: 9,
    image: `${BASE_URL}token-images/9.png`,
    traits: [
      { trait_type: "name", value: "Wanda" },
      { trait_type: "project", value: "gon.id" },
    ],
    artist: "Onchain Clarity Co",
    blockchain: "OP Mainnet",
    token_standard: "ERC-1155",
    external_url: `${BASE_URL}round/9`,
  },
  {
    id: BigInt(10),
    name: "Jelly Beans Round 10",
    description: "This token represents a prediction in Round 10 of Jelly Beans",
    collection: "jellybeans",
    round: 10,
    image: `${BASE_URL}token-images/10.png`,
    traits: [
      { trait_type: "name", value: "Sam" },
      { trait_type: "project", value: "Zora" },
    ],
    artist: "Onchain Clarity Co",
    blockchain: "OP Mainnet",
    token_standard: "ERC-1155",
    external_url: `${BASE_URL}round/10`,
  },
];
