import { XTokenCreated } from "../../generated/NFTXInventoryStaking/NFTXInventoryStaking";
import { createTokenAndAssignVaultId } from "./utils/vaultIdAssignment";

export function handleXTokenCreated(event: XTokenCreated): void {
  createTokenAndAssignVaultId(event.params.xToken, event.params.vaultId);
}
