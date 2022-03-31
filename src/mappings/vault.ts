import { NewVault } from "../../generated/NFTXVaultFactoryUpgradeable/NFTXVaultFactoryUpgradeable";
import { NFTXVaultUpgradeable } from "../../generated/templates";

export function handleNewVault(event: NewVault): void {
  NFTXVaultUpgradeable.create(event.params.vaultAddress);
}
