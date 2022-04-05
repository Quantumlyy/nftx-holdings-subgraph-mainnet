import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ERC20Contract } from "../../../generated/schema";
import { Token } from "../../../generated/templates";
import { fetchAccount } from "./fetch/account";
import { fetchERC20 } from "../erc20/fetch";

export function createTokenAndAssignVaultId(
  address: Address,
  vaultId?: BigInt
): void {
  const account = fetchAccount(address);
  const tokenContract = ERC20Contract.load(account.id);

  if (!tokenContract) Token.create(address);

  const templatedTokenContract = fetchERC20(address);
  if (!templatedTokenContract.vault && vaultId) {
    templatedTokenContract.vault = vaultId;

    templatedTokenContract.save();
  }
}
