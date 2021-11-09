import { Item } from "../gilded-rose";
import { ItemTransformation } from "../item-transformation";
import { ItemTransformationVisitor } from "../item-transformation-visitor";

export class QualityGainingItemTransformationVisitor implements ItemTransformationVisitor {
  qualityGainingItemNames: Set<string>;

  constructor(qualityGainingItemNames: string[]) {
    this.qualityGainingItemNames = new Set<string>(qualityGainingItemNames);
  }

  processItemTransformation(itemTransformation: ItemTransformation, item: Item): ItemTransformation {
    if (this.qualityGainingItemNames.has(item.name)) {
      // For quality-gaining items, increment quality instead
      itemTransformation.qualityModifier = +1;
    }
    return itemTransformation;
  }
}
