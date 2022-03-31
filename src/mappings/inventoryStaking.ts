import { XTokenCreated } from "../../generated/NFTXInventoryStaking/NFTXInventoryStaking";
import { XTokenUpgradeable } from "../../generated/templates";

export function handleXTokenCreated(event: XTokenCreated): void {
  XTokenUpgradeable.create(event.params.xToken);
}
