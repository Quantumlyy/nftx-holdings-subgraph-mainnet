import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ERC20Contract } from "../../../generated/schema";
import { Token } from "../../../generated/templates";
import { fetchAccount } from "./fetch/account";
import { fetchVaultAsset } from "./fetch/vaultAsset";

export function createTokenAndAssignAssetInfo(
  address: Address,
  vaultId: BigInt,
  type: string
): void {
  const account = fetchAccount(address);
  const vaultAsset = fetchVaultAsset(account.id);
  const tokenContract = ERC20Contract.load(account.id);

  if (!tokenContract) Token.create(address);

  vaultAsset.vaultId = vaultId;
  vaultAsset.type = type;
  vaultAsset.save();
}
