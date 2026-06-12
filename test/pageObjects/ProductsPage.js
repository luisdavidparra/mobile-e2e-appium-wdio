class ProductsPage {
  get productsPageHeaderText() {
    return $('android=new UiSelector().text("Products")');
  }
}

module.exports = new ProductsPage();
