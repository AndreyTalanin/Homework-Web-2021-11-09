import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  // A test for empty arrays
  it("Should work with empty arrays", function () {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();
    expect(items.length).to.equal(0);
  });
});

describe("Gilded Rose - Common Items", function () {
  const commonItemName = "Common Item";

  // Tests for CommonItemTransformationVisitor
  it("Should decrement sellIn for common items", function () {
    const gildedRose = new GildedRose([new Item(commonItemName, 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });

  it("Should decrease quality for common items", function () {
    const gildedRose = new GildedRose([new Item(commonItemName, 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  // Tests for OutdatedItemTransformationVisitor
  it("Should not decrement sellIn for outdated items", function () {
    const gildedRose = new GildedRose([new Item(commonItemName, 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });

  it("Should decrease quality for outdated items twice as fast", function () {
    const gildedRose = new GildedRose([new Item(commonItemName, 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  // Tests for FinalVisitor
  it("Should not decrement sellIn below 0", function () {
    const gildedRose = new GildedRose([new Item(commonItemName, 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });

  it("Should not decrement quality below 0", function () {
    const gildedRose = new GildedRose([new Item(commonItemName, 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
});

describe("Gilded Rose - Quality-Gaining Items", function () {
  const qualityGainingItemName = "Aged Brie";

  // Tests for QualityGainingItemTransformationVisitor
  it("Should decrement sellIn for quality-gaining items", function () {
    const gildedRose = new GildedRose([new Item(qualityGainingItemName, 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });

  it("Should increment quality for quality-gaining items", function () {
    const gildedRose = new GildedRose([new Item(qualityGainingItemName, 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(1);
  });

  // Tests for FinalVisitor
  it("Should not increment quality above 50", function () {
    const gildedRose = new GildedRose([new Item(qualityGainingItemName, 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });
});

describe("Gilded Rose - Expiring Items", function () {
  const expiringItemName = "Backstage Pass to ETC Concert";

  // Tests for ExpiringItemTransformationVisitor
  it("Should increase quantity by 1 for expiring items", function () {
    const gildedRose = new GildedRose([new Item(expiringItemName, 50, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(1);
  });

  it("Should increase quantity by 2 in 10 days before expiration", function () {
    const gildedRose = new GildedRose([new Item(expiringItemName, 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
  });

  it("Should increase quantity by 3 in 5 days before expiration", function () {
    const gildedRose = new GildedRose([new Item(expiringItemName, 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
  });

  it("Should bring quantity to 0 after expiration", function () {
    const gildedRose = new GildedRose([new Item(expiringItemName, 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
});

describe("Gilded Rose - Legendary Items", function () {
  const legendaryItemName = "Sulfuras, Hand of Ragnaros";

  // Tests for ExpiringItemTransformationVisitor
  it("Should not decrement sellIn for legendary items", function () {
    const gildedRose = new GildedRose([new Item(legendaryItemName, 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(1);
  });

  it("Should not decrement quality for legendary items", function () {
    const gildedRose = new GildedRose([new Item(legendaryItemName, 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
  });
});

describe("Gilded Rose - Conjured Items", function () {
  const conjuredItemName = "Conjured Crystal Water";

  // Tests for ConjuredItemTransformationVisitor
  it("Should decrease quality for conjured items twice as fast", function () {
    const gildedRose = new GildedRose([new Item(conjuredItemName, 1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });
});
