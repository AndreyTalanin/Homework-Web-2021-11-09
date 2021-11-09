import { Item } from "../gilded-rose";
import { ItemTransformation } from "../item-transformation";
import { ItemTransformationVisitor } from "../item-transformation-visitor";

export class ExpiringItemTransformationVisitor implements ItemTransformationVisitor {
  expiringItemNames: Set<string>;

  constructor(expiringItemNames: string[]) {
    this.expiringItemNames = new Set<string>(expiringItemNames);
  }

  processItemTransformation(itemTransformation: ItemTransformation, item: Item): ItemTransformation {
    if (this.expiringItemNames.has(item.name)) {
      if (item.sellIn > 10) {
        // Expiring items' quality is increased over time
        itemTransformation.qualityModifier = +1;
      }
      if (item.sellIn <= 10) {
        // If there are less than 10 days left, add 2 quality
        itemTransformation.qualityModifier = +2;
      }
      if (item.sellIn <= 5) {
        // If there are less than 5 days left, add 3 quality
        itemTransformation.qualityModifier = +3;
      }
      if (item.sellIn == 0) {
        // If item is expired, bring quality to 0
        itemTransformation.qualityModifier = -item.quality;
      }
    }
    return itemTransformation;
  }
}
