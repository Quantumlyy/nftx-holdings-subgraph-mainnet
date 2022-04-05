import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Factory } from "../../generated/NFTXStakingZapV2/Factory";
import { UserStaked } from "../../generated/NFTXStakingZapV2/NFTXStakingZap";
import { NFTXVaultFactoryUpgradeable } from "../../generated/NFTXStakingZapV2/NFTXVaultFactoryUpgradeable";
import {
  PoolCreated,
  PoolUpdated,
} from "../../generated/templates/NFTXLPStaking/NFTXLPStaking";
import {
  MAINNET_NFTX_VAULT_FACTORY,
  MAINNET_SUSHISWAP_FACTORY,
  MAINNET_WETH,
} from "./utils/constants";
import { createTokenAndAssignVaultId } from "./utils/vaultIdAssignment";

export function handleVaultTokenWETHPairCreation(event: UserStaked): void {
  const sushiswapFactory = Factory.bind(MAINNET_SUSHISWAP_FACTORY);
  const nftxVaultFactory = NFTXVaultFactoryUpgradeable.bind(
    MAINNET_NFTX_VAULT_FACTORY
  );

  const tokenA = nftxVaultFactory
    .vault(event.params.vaultId)
    .toHexString()
    .toLowerCase();
  const tokenB = MAINNET_WETH.toHexString().toLowerCase();
  const token0 = tokenA < tokenB ? tokenA : tokenB;
  const token1 = tokenA < tokenB ? tokenB : tokenA;

  const pair = sushiswapFactory.getPair(
    Address.fromString(token0),
    Address.fromString(token1)
  );

  createTokenAndAssignVaultId(pair, event.params.vaultId);
}

function newPool(pair: Address, vaultId: BigInt): void {
  createTokenAndAssignVaultId(pair, vaultId);
}

export function handlePoolCreated(event: PoolCreated): void {
  newPool(event.params.pool, event.params.vaultId);
}

export function handlePoolUpdated(event: PoolUpdated): void {
  newPool(event.params.pool, event.params.vaultId);
}
