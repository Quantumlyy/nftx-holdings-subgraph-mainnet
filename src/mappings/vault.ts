import {
  NewFeeDistributor,
  NewVault,
} from "../../generated/NFTXVaultFactoryUpgradeable/NFTXVaultFactoryUpgradeable";
import { NFTXVaultUpgradeable, NFTXLPStaking } from "../../generated/templates";
import { NFTXFeeDistributor } from "../../generated/NFTXVaultFactoryUpgradeable/NFTXFeeDistributor";
import { ADDRESS_ZERO } from "./utils/constants";

export function handleNewVault(event: NewVault): void {
  NFTXVaultUpgradeable.create(event.params.vaultAddress);
}

export function handleNewFeeDistributor(event: NewFeeDistributor): void {
  const feeDistributor = NFTXFeeDistributor.bind(event.params.newDistributor);

  let lpStakingAddressFromInstance = feeDistributor.try_lpStaking();

  const lpStakingAddress = lpStakingAddressFromInstance.reverted
    ? ADDRESS_ZERO
    : lpStakingAddressFromInstance.value;

  NFTXLPStaking.create(lpStakingAddress);
}
