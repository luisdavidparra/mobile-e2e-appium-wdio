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

  get productItemTitleSelector() {
    return "~store item text";
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
}

module.exports = new CatalogPage();
