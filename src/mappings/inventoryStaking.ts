import { Address, BigInt, dataSource } from "@graphprotocol/graph-ts";
import { XTokenCreated, Deposit, Withdraw, NFTXInventoryStaking } from "../../generated/NFTXInventoryStaking/NFTXInventoryStaking";
import { VaultAsset } from "../../generated/schema";
import { NFTXVaultFactoryUpgradeable } from "../../generated/templates/Token/NFTXVaultFactoryUpgradeable";
import { ADDRESS_ZERO, NFTX_INVENTORY_STAKING, NFTX_VAULT_FACTORY } from "./utils/constants";
import { fetchAccount } from "./utils/fetch/account";
import { fetchVaultAsset } from "./utils/fetch/vaultAsset";
import { createTokenAndAssignAssetInfo } from "./utils/vaultIdAssignment";

export function handleXTokenCreated(event: XTokenCreated): void {
  createTokenAndAssignAssetInfo(event.params.xToken, event.params.vaultId, "xToken");
}

export function handleXTokenDeposited(event: Deposit): void {
  const network: string = dataSource.network();
  const vaultId = event.params.vaultId;

  let vaultAddress = getVaultAddress(vaultId, network);
  let xTokenShareValue = getXTokenShareValue(vaultId, network);
  
  let account = fetchAccount(vaultAddress);
  let vaultAsset = VaultAsset.load(vaultAddress.toHex());
  if (!vaultAsset) {
    vaultAsset = fetchVaultAsset(account.id);
  }
  vaultAsset.xTokenShareValue = xTokenShareValue;
  vaultAsset.save();
}

export function handleXTokenWithdrawn(event: Withdraw): void {
  const network: string = dataSource.network();
  const vaultId = event.params.vaultId;

  let vaultAddress = getVaultAddress(vaultId, network);
  let xTokenShareValue = getXTokenShareValue(vaultId, network);
  if (vaultAddress == ADDRESS_ZERO || xTokenShareValue == BigInt.fromI32(0)) return;

  let account = fetchAccount(vaultAddress);
  let vaultAsset = VaultAsset.load(vaultAddress.toHex());
  if (!vaultAsset) {
    vaultAsset = fetchVaultAsset(account.id);
  }
  vaultAsset.xTokenShareValue = xTokenShareValue;
  vaultAsset.save();
}

function getVaultAddress(vaultId: BigInt, network: string): Address {
  const nftxVaultFactory = NFTXVaultFactoryUpgradeable.bind(
    NFTX_VAULT_FACTORY(network)
  );
  let vaultAddressFromInstance = nftxVaultFactory.try_vault(vaultId);
  if (vaultAddressFromInstance.reverted) return ADDRESS_ZERO;
  return vaultAddressFromInstance.value;
}

function getXTokenShareValue(vaultId: BigInt, network: string): BigInt {
  const nftxInventoryStaking = NFTXInventoryStaking.bind(NFTX_INVENTORY_STAKING(network))
  const xTokenShareValueFromInstance = nftxInventoryStaking.try_xTokenShareValue(vaultId);
  if (xTokenShareValueFromInstance.reverted) return BigInt.fromI32(0);
  return xTokenShareValueFromInstance.value;
}