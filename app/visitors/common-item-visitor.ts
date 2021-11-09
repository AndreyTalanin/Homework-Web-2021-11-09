import { Item } from "../gilded-rose";
import { ItemTransformation } from "../item-transformation";
import { ItemTransformationVisitor } from "../item-transformation-visitor";

export class CommonItemTransformationVisitor implements ItemTransformationVisitor {
  processItemTransformation(itemTransformation: ItemTransformation, item: Item): ItemTransformation {
    // By default, decrement both sellIn and quality by one
    itemTransformation.decrementSellIn = true;
    itemTransformation.qualityModifier = -1;
    return itemTransformation;
  }
}
