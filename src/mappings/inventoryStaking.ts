import { XTokenCreated } from "../../generated/NFTXInventoryStaking/NFTXInventoryStaking";
import { createTokenAndAssignAssetInfo } from "./utils/vaultIdAssignment";

export function handleXTokenCreated(event: XTokenCreated): void {
  createTokenAndAssignAssetInfo(event.params.xToken, event.params.vaultId, "xToken");
}
