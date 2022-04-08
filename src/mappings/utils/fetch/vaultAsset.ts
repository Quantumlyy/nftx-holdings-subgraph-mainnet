import { VaultAsset } from "../../../../generated/schema";

export function fetchVaultAsset(accountId: string): VaultAsset {
  const vaultAsset = new VaultAsset(accountId);
  vaultAsset.save();
  return vaultAsset;
}
