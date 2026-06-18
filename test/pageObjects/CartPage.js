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

  get totalCartProducts() {
    return $("~total number");
  }

  get totalCartPrice() {
    return $("~total price");
  }

  async getCartItemByName(productName) {
    const results = await getAllItemsByScrolling(
      this.productContainerSelector,
      [
        { key: "name", selector: this.productNameSelector },
        { key: "price", selector: this.productPriceSelector },
        { key: "amount", selector: this.productAmountSelector },
      ],
      Infinity,
    );
    return results.find((res) => res.name === productName);
  }

  async getTotalCartProducts() {
    return await this.totalCartProducts.getText();
  }
}

module.exports = new CartPage();
