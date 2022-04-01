import { Address } from "@graphprotocol/graph-ts";
import { Factory } from "../../generated/NFTXStakingZapV2/Factory";
import { UserStaked } from "../../generated/NFTXStakingZapV2/NFTXStakingZap";
import { NFTXVaultFactoryUpgradeable } from "../../generated/NFTXStakingZapV2/NFTXVaultFactoryUpgradeable";
import { Account, ERC20Contract } from "../../generated/schema";
import { SLP } from "../../generated/templates";
import { fetchAccount } from "./utils/fetch/account";

const MAINNET_SUSHISWAP_FACTORY = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac";
const MAINNET_NFTX_VAULT_FACTORY = "0xBE86f647b167567525cCAAfcd6f881F1Ee558216";
const MAINNET_WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

export function handleVaultTokenWETHPairCreation(event: UserStaked): void {
  const sushiswapFactory = Factory.bind(
    Address.fromString(MAINNET_SUSHISWAP_FACTORY)
  );
  const nftxVaultFactory = NFTXVaultFactoryUpgradeable.bind(
    Address.fromString(MAINNET_NFTX_VAULT_FACTORY)
  );

  const tokenA = nftxVaultFactory
    .vault(event.params.vaultId)
    .toHexString()
    .toLowerCase();
  const tokenB = MAINNET_WETH.toLowerCase();
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
