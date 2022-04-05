import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ERC20Contract } from "../../../generated/schema";
import { Token } from "../../../generated/templates";
import { fetchAccount } from "./fetch/account";
import { fetchERC20 } from "../erc20/fetch";
import { fetchVaultAsset } from "./fetch/vaultAsset";

export function createTokenAndAssignVaultId(
  address: Address,
  vaultId: BigInt
): void {
  const account = fetchAccount(address);
  const vaultAsset = fetchVaultAsset(account.id);
  const tokenContract = ERC20Contract.load(account.id);

  if (!tokenContract) Token.create(address);

  vaultAsset.vaultId = vaultId;
  vaultAsset.save();
}
