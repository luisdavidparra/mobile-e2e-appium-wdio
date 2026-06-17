const {
  waitElementForDisplayed,
  getAllItemsByScrolling,
} = require("../helpers/ui");

class CatalogPage {
  get catalogPageHeaderText() {
    return $('android=new UiSelector().text("Products")');
  }

  get productItemList() {
    return $$("~store item");
  }

  get productItemTitle() {
    return $("~store item text");
  }

  get productItemSelector() {
    return "~store item";
  }

  get productItemTitleSelector() {
    return "~store item text";
  }

  get productItemPriceSelector() {
    return "~store item price";
  }

  get productItemTitleList() {
    return $$("~store item text");
  }

  get sortButton() {
    return $("~sort button");
  }

  get sortByNameAscendingButton() {
    return $("~nameAsc");
  }

  get sortByNameDescendingButton() {
    return $("~nameDesc");
  }

  get sortByPriceAscendingButton() {
    return $("~priceAsc");
  }

  get sortByPriceDescendingButton() {
    return $("~priceDesc");
  }

  async getProducts(expectedCount = Infinity) {
    return await getAllItemsByScrolling(
      this.productItemSelector,
      [
        { key: "name", selector: this.productItemTitleSelector },
        { key: "price", selector: this.productItemPriceSelector },
      ],
      expectedCount,
    );
  }

  async sortCatalog(optionButton) {
    await waitElementForDisplayed(this.catalogPageHeaderText);
    await this.sortButton.click();
    await optionButton.click();

    // Wait for first product to be rendered after sort
    await waitElementForDisplayed(this.productItemTitle);
  }

  async tapProductByName(productName) {
    const items = await this.productItemList;
    const target = await items.find(async (item) => {
      const text = await item.$(this.productItemTitleSelector).getText();
      return text === productName;
    });
    await target.click();
  }
}

module.exports = new CatalogPage();
