import { Item } from "../gilded-rose";
import { ItemTransformation } from "../item-transformation";
import { ItemTransformationVisitor } from "../item-transformation-visitor";

export class FinalVisitor implements ItemTransformationVisitor {
  processItemTransformation(itemTransformation: ItemTransformation, item: Item): ItemTransformation {
    if (itemTransformation.qualityModifier > 50 - item.quality) {
      // Do not increase quality above 50
      itemTransformation.qualityModifier = Math.max(50 - item.quality, 0);
    }
    if (itemTransformation.qualityModifier < 0 - item.quality) {
      // Do not bring quality below 0
      itemTransformation.qualityModifier = Math.min(0 - item.quality, 0);
    }
    if (item.sellIn == 0) {
      // Do not bring sellIn below 0
      itemTransformation.decrementSellIn = false;
    }
    return itemTransformation;
  }
}
