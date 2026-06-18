class CatalogPage {
  async titleByName(name) {
    return $(`android=new UiSelector().text("${name}")`);
  }

  get price() {
    return $("~product price");
  }

  get description() {
    return $("~product description");
  }

  get counterPlusButton() {
    return $("~counter plus button");
  }

  get addToCartButton() {
    return $("~Add To Cart button");
  }

  async colorOption(color) {
    return $(`~${color} circle`);
  }

  async addProductToShoppingCart(amount) {
    for (var i = 1; i < amount; i++) {
      // Starts in 1 because default value is 1 in shopping cart
      await this.counterPlusButton.click();
    }
    await this.addToCartButton.click();
  }
}

module.exports = new CatalogPage();
