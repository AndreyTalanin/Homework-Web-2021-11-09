import { Item } from "./gilded-rose";
import { ItemTransformation } from "./item-transformation";

export interface ItemTransformationVisitor {
  processItemTransformation(itemTransformation: ItemTransformation, item: Item): ItemTransformation;
}
