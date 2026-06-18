const CommonPage = require("../pageObjects/CommonPage");
const CatalogPage = require("../pageObjects/CatalogPage");
const ProductPage = require("../pageObjects/ProductPage");
const CartPage = require("../pageObjects/CartPage");
const CheckoutPage = require("../pageObjects/CheckoutPage");
const { detailedProduct } = require("../data/products");

describe("US-04 - Checkout", () => {
  it("TC-013 - should show error when proceeding without shipping information", async () => {
    await CommonPage.loginAsStandardUser();
    await CatalogPage.tapProductByName(detailedProduct.name);
    await ProductPage.addProductToShoppingCart(1);
    await CommonPage.navigateToMyCart();

    await CartPage.proceedToCheckoutButton.click();
    await CheckoutPage.toPaymentButton.click();

    await expect(CheckoutPage.shippingErrorMessages.fullName).toBeDisplayed();
    await expect(CheckoutPage.shippingErrorMessages.address).toBeDisplayed();
    await expect(CheckoutPage.shippingErrorMessages.zip).toBeDisplayed();
    await expect(CheckoutPage.shippingErrorMessages.country).toBeDisplayed();
    await expect(CheckoutPage.shippingErrorMessages.city).toBeDisplayed();
  });
});
