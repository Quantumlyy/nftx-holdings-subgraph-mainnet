import { Address } from "@graphprotocol/graph-ts";
import { Factory } from "../../generated/NFTXStakingZapV2/Factory";
import { UserStaked } from "../../generated/NFTXStakingZapV2/NFTXStakingZap";
import { NFTXVaultFactoryUpgradeable } from "../../generated/NFTXStakingZapV2/NFTXVaultFactoryUpgradeable";
import { ERC20Contract } from "../../generated/schema";
import { SLP } from "../../generated/templates";
import {
  MAINNET_NFTX_VAULT_FACTORY,
  MAINNET_SUSHISWAP_FACTORY,
  MAINNET_WETH,
} from "./utils/constants";
import { fetchAccount } from "./utils/fetch/account";
import {
  PoolCreated,
  PoolUpdated,
} from "../../generated/templates/NFTXLPStaking/NFTXLPStaking";

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

  const account = fetchAccount(pair);
  const tokenContract = ERC20Contract.load(account.id);

  if (tokenContract === null) {
    SLP.create(pair);
  }
}

function newPool(pair: Address): void {
  const account = fetchAccount(pair);
  const tokenContract = ERC20Contract.load(account.id);

  if (tokenContract === null) {
    SLP.create(pair);
  }
}

export function handlePoolCreated(event: PoolCreated): void {
  newPool(event.params.pool);
}

export function handlePoolUpdated(event: PoolUpdated): void {
  newPool(event.params.pool);
}
