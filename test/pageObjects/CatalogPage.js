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
}

module.exports = new CatalogPage();
