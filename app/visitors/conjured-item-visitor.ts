import { Item } from "../gilded-rose";
import { ItemTransformation } from "../item-transformation";
import { ItemTransformationVisitor } from "../item-transformation-visitor";

export class ConjuredItemTransformationVisitor implements ItemTransformationVisitor {
  conjuredItemNames: Set<string>;

  constructor(conjuredItemNames: string[]) {
    this.conjuredItemNames = new Set<string>(conjuredItemNames);
  }

  processItemTransformation(itemTransformation: ItemTransformation, item: Item): ItemTransformation {
    if (this.conjuredItemNames.has(item.name)) {
      // Conjured items lose quality twice as fast
      itemTransformation.qualityModifier *= 2;
    }
    return itemTransformation;
  }
}
