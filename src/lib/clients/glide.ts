import { createGlideConfig, chains, currencies } from "@paywithglide/glide-js";

export const glideConfig = createGlideConfig({
  projectId: process.env.NEXT_PUBLIC_GLIDE_PROJECT_ID!,

  // Add more chains as needed. Remember to add them to wagmi config as well.
  chains: [chains.base, chains.optimism],

  // Optional. Remove this filter if we want to support non-ETH currencies as
  // well. Or, add more supported currencies such as currencies.usdc here.
  paymentCurrencies: [currencies.eth],
});
