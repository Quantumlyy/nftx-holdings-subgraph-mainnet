import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Factory } from "../../generated/NFTXStakingZapV2/Factory";
import { UserStaked } from "../../generated/NFTXStakingZapV2/NFTXStakingZap";
import { NFTXVaultFactoryUpgradeable } from "../../generated/templates/Token/NFTXVaultFactoryUpgradeable";
import {
  PoolCreated,
  PoolUpdated,
} from "../../generated/templates/NFTXLPStaking/NFTXLPStaking";
import { StakingTokenProvider } from "../../generated/templates/Token/StakingTokenProvider";
import {
  MAINNET_NFTX_VAULT_FACTORY,
  MAINNET_STAKING_TOKEN_PROVIDER,
  MAINNET_WETH,
} from "./utils/constants";
import { createTokenAndAssignAssetInfo } from "./utils/vaultIdAssignment";

export function handleVaultTokenWETHPairCreation(event: UserStaked): void {
  stakingPair(event.params.vaultId);
}

function stakingPair(vaultId: BigInt): void {
  const nftxVaultFactory = NFTXVaultFactoryUpgradeable.bind(
    MAINNET_NFTX_VAULT_FACTORY
  );
  const stakingTokenProvider = StakingTokenProvider.bind(
    MAINNET_STAKING_TOKEN_PROVIDER
  );

  const vaultTokenFromInstance = nftxVaultFactory.try_vault(vaultId);
  if (vaultTokenFromInstance.reverted) return;

  const pairFromInstance = stakingTokenProvider.try_stakingTokenForVaultToken(vaultTokenFromInstance.value);
  if (pairFromInstance.reverted) return;

  createTokenAndAssignAssetInfo(pairFromInstance.value, vaultId, "vTokenWETH");
}

function newPool(pair: Address, vaultId: BigInt): void {
  createTokenAndAssignAssetInfo(pair, vaultId, "xTokenWETH");
}

export function handlePoolCreated(event: PoolCreated): void {
  newPool(event.params.pool, event.params.vaultId);
  stakingPair(event.params.vaultId);
}

export function handlePoolUpdated(event: PoolUpdated): void {
  newPool(event.params.pool, event.params.vaultId);
}
