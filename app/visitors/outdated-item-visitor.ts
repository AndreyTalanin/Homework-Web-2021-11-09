import { Item } from "../gilded-rose";
import { ItemTransformation } from "../item-transformation";
import { ItemTransformationVisitor } from "../item-transformation-visitor";

export class OutdatedItemTransformationVisitor implements ItemTransformationVisitor {
  processItemTransformation(itemTransformation: ItemTransformation, item: Item): ItemTransformation {
    if (item.sellIn == 0) {
      // Do not decrement sellIn for outdated items, but decrement quality twice as fast
      itemTransformation.decrementSellIn = false;
      itemTransformation.qualityModifier *= 2;
    }
    return itemTransformation;
  }
}
