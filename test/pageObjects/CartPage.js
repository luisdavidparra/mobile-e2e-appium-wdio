const { getAllItemsByScrolling } = require("../helpers/ui");

class CartPage {
  get productContainerSelector() {
    return "~product row";
  }

  get productNameSelector() {
    return "~product label";
  }

  get productPriceSelector() {
    return "~product price";
  }

  get productAmountSelector() {
    return 'android=new UiSelector().description("counter amount").childSelector(new UiSelector().className("android.widget.TextView"))';
  }

  get minusButtonSelector() {
    return "~counter minus button";
  }

  get totalCartProducts() {
    return $("~total number");
  }

  get totalCartPrice() {
    return $("~total price");
  }

  async getProductDetailsByName(productName) {
    const products = await getAllItemsByScrolling(
      this.productContainerSelector,
      [
        { key: "name", selector: this.productNameSelector },
        { key: "price", selector: this.productPriceSelector },
        { key: "amount", selector: this.productAmountSelector },
      ],
      Infinity,
    );
    return products.find((product) => product.name === productName);
  }

  async getTotalCartProducts() {
    return await this.totalCartProducts.getText();
  }

  async decreaseProductQuantity(productName) {
    const rows = await $$(this.productContainerSelector);
    const targetRow = await rows.find(async (row) => {
      const name = await row.$(this.productNameSelector);
      return (
        (await name.isExisting()) && (await name.getText()) === productName
      );
    });
    await targetRow.$(this.minusButtonSelector).click();
  }
}

module.exports = new CartPage();
