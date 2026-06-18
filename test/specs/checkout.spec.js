const CommonPage = require("../pageObjects/CommonPage");
const CatalogPage = require("../pageObjects/CatalogPage");
const ProductPage = require("../pageObjects/ProductPage");
const CartPage = require("../pageObjects/CartPage");
const CheckoutPage = require("../pageObjects/CheckoutPage");
const { detailedProduct } = require("../data/products");
const { standard } = require("../data/user");
const { getTextsFromElements } = require("../helpers/ui");

describe("US-04 - Checkout", () => {
  it("TC-013 - should show error when proceeding without shipping information", async () => {
    await CommonPage.loginAsStandardUser();
    await CatalogPage.tapProductByName(detailedProduct.name);
    await ProductPage.addProductToShoppingCart(1);
    await CommonPage.navigateToMyCart();

    await CartPage.proceedToCheckoutButton.click();
    await CheckoutPage.toPaymentButton.click();

    await expect(CheckoutPage.shippingInfoErrors.fullName).toBeDisplayed();
    await expect(CheckoutPage.shippingInfoErrors.address).toBeDisplayed();
    await expect(CheckoutPage.shippingInfoErrors.zip).toBeDisplayed();
    await expect(CheckoutPage.shippingInfoErrors.country).toBeDisplayed();
    await expect(CheckoutPage.shippingInfoErrors.city).toBeDisplayed();
  });

  it("TC-014 - should display correct order summary before confirming", async () => {
    await CommonPage.loginAsStandardUser();
    await CatalogPage.tapProductByName(detailedProduct.name);
    await ProductPage.addProductToShoppingCart(1);
    await CommonPage.navigateToMyCart();

    await CartPage.proceedToCheckoutButton.click();

    const shipInfo = standard.shippingInfo;
    const cardInfo = standard.cardInfo;

    await CheckoutPage.fillShippingInfo(shipInfo);
    await CheckoutPage.toPaymentButton.click();
    await CheckoutPage.fillPaymentInfo(cardInfo);
    await CheckoutPage.proceedToReviewOrder();

    const addressInfoContainer = await CheckoutPage.checkoutUserInfo.address;
    const addressValues = await getTextsFromElements(addressInfoContainer);

    await expect(addressValues).toContain(shipInfo.fullName);
    await expect(addressValues).toContain(shipInfo.address);
    await expect(addressValues).toContain(shipInfo.city);
    await expect(addressValues).toContain(
      `${shipInfo.country}, ${shipInfo.zipCode}`,
    );

    const paymentInfoContainer = await CheckoutPage.checkoutUserInfo.payment;
    const paymentValues = await getTextsFromElements(paymentInfoContainer);

    await expect(paymentValues).toContain(cardInfo.fullName);
    await expect(paymentValues).toContain(cardInfo.cardNumber);
    await expect(paymentValues).toContain(`Exp: ${cardInfo.expirationDate}`);
  });
});
