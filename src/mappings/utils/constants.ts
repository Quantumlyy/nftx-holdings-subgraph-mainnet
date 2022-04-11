import { Address } from "@graphprotocol/graph-ts";

export const ADDRESS_ZERO: Address = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const MAINNET_STAKING_TOKEN_PROVIDER = Address.fromString(
  "0x5fAD0e4cc9925365b9B0bbEc9e0C3536c0B1a5C7"
);
export const RINKEBY_STAKING_TOKEN_PROVIDER = Address.fromString(
  "0x262FEeCBac8Ee97200F060aeFd89BD41b961e526"
);
export const ARBITRUM_ONE_STAKING_TOKEN_PROVIDER = Address.fromString(
  "0xe5AB394e284d095aDacff8A0fb486cb5a24b0b7a"
);

export const MAINNET_NFTX_VAULT_FACTORY = Address.fromString(
  "0xBE86f647b167567525cCAAfcd6f881F1Ee558216"
);
export const RINKEBY_NFTX_VAULT_FACTORY = Address.fromString(
  "0xbbc53022af15bb973ad906577c84784c47c14371"
);
export const ARBITRUM_ONE_NFTX_VAULT_FACTORY = Address.fromString(
  "0xe01Cf5099e700c282A56E815ABd0C4948298Afae"
);

export const MAINNET_NFTX_INVENTORY_STAKING = Address.fromString(
  "0x3E135c3E981fAe3383A5aE0d323860a34CfAB893"
);
export const RINKEBY_NFTX_INVENTORY_STAKING = Address.fromString(
  "0x05aD54B40e3be8252CB257f77d9301E9CB1A9470"
);
export const ARBITRUM_ONE_NFTX_INVENTORY_STAKING = Address.fromString(
  "0x64029E2da85B1d53815d111FEd15609034E5D557"
);

export const MAINNET_WETH = Address.fromString(
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
);

export function STAKING_TOKEN_PROVIDER(network: string): Address {
  if (network === "mainnet") return MAINNET_STAKING_TOKEN_PROVIDER;
  else if (network === "rinkeby") return RINKEBY_STAKING_TOKEN_PROVIDER;
  else if (network === "arbitrum-one")
    return ARBITRUM_ONE_STAKING_TOKEN_PROVIDER;
  return MAINNET_STAKING_TOKEN_PROVIDER;
}

export function NFTX_VAULT_FACTORY(network: string): Address {
  if (network === "mainnet") return MAINNET_NFTX_VAULT_FACTORY;
  else if (network === "rinkeby") return RINKEBY_NFTX_VAULT_FACTORY;
  else if (network === "arbitrum-one") return ARBITRUM_ONE_NFTX_VAULT_FACTORY;
  return MAINNET_NFTX_VAULT_FACTORY;
}

export function NFTX_INVENTORY_STAKING(network: string): Address {
  if (network === "mainnet") return MAINNET_NFTX_INVENTORY_STAKING;
  else if (network === "rinkeby") return RINKEBY_NFTX_INVENTORY_STAKING;
  else if (network === "arbitrum-one") return ARBITRUM_ONE_NFTX_INVENTORY_STAKING;
  return MAINNET_NFTX_INVENTORY_STAKING;
}

export function WETH(network: string): Address {
  if (network === "mainnet") return MAINNET_WETH;
  return MAINNET_WETH;
}
