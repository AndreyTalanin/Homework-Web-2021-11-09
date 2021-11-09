import { ItemTransformationVisitor } from "./item-transformation-visitor";
import { CommonItemTransformationVisitor } from "./visitors/common-item-visitor";
import { ConjuredItemTransformationVisitor } from "./visitors/conjured-item-visitor";
import { ExpiringItemTransformationVisitor } from "./visitors/expiring-item-visitor";
import { FinalVisitor } from "./visitors/final-visitor";
import { LegendaryItemTransformationVisitor } from "./visitors/legendary-item-visitor";
import { OutdatedItemTransformationVisitor } from "./visitors/outdated-item-visitor";
import { QualityGainingItemTransformationVisitor } from "./visitors/quality-gaining-item-visitor";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Item[];
  legendaryItemNames: string[];
  qualityGainingItemNames: string[];
  expiringItemNames: string[];
  conjuredItemNames: string[];
  visitors: ItemTransformationVisitor[];

  constructor(items = [] as Item[]) {
    this.items = items;
    this.legendaryItemNames = ["Sulfuras, Hand of Ragnaros"];
    this.qualityGainingItemNames = ["Aged Brie"];
    this.expiringItemNames = ["Backstage Pass to ETC Concert"];
    this.conjuredItemNames = ["Conjured Crystal Water"];
    this.visitors = [
      new CommonItemTransformationVisitor(),
      new OutdatedItemTransformationVisitor(),
      new QualityGainingItemTransformationVisitor(this.qualityGainingItemNames),
      new ExpiringItemTransformationVisitor(this.expiringItemNames),
      new LegendaryItemTransformationVisitor(this.legendaryItemNames),
      new ConjuredItemTransformationVisitor(this.conjuredItemNames),
      new FinalVisitor(),
    ];
  }

  updateQuality() {
    this.items.forEach((item) => {
      let itemTransformation = { decrementSellIn: true, qualityModifier: 0 };
      this.visitors.forEach((visitor) => {
        itemTransformation = visitor.processItemTransformation(itemTransformation, item);
      });
      item.sellIn += itemTransformation.decrementSellIn ? -1 : 0;
      item.quality += itemTransformation.qualityModifier;
    });
    return this.items;
  }
}
