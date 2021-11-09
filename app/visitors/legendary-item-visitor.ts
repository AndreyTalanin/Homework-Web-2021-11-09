import { Item } from "../gilded-rose";
import { ItemTransformation } from "../item-transformation";
import { ItemTransformationVisitor } from "../item-transformation-visitor";

export class LegendaryItemTransformationVisitor implements ItemTransformationVisitor {
  legendaryItemNames: Set<string>;

  constructor(legendaryItemNames: string[]) {
    this.legendaryItemNames = new Set<string>(legendaryItemNames);
  }

  processItemTransformation(itemTransformation: ItemTransformation, item: Item): ItemTransformation {
    if (this.legendaryItemNames.has(item.name)) {
      // Do not do anything with legendary items
      itemTransformation.decrementSellIn = false;
      itemTransformation.qualityModifier = 0;
    }
    return itemTransformation;
  }
}
