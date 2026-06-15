class CatalogPage {
  get catalogPageHeaderText() {
    return $('android=new UiSelector().text("Products")');
  }

  get productItems() {
    return $$("~store item");
  }
}

module.exports = new CatalogPage();
