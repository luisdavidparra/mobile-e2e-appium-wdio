const CatalogPage = require("../pageObjects/CatalogPage");
const ProductPage = require("../pageObjects/ProductPage");
const CommonPage = require("../pageObjects/CommonPage");
const CartPage = require("../pageObjects/CartPage");
const { detailedProduct } = require("../data/products");

describe("US-03 - Shopping Cart Management", () => {
  it("TC-010 - should add product to cart with correct quantity and price", async () => {
    const productsAmount = 3;
    const productName = detailedProduct.name;

    await CatalogPage.tapProductByName(productName);
    await ProductPage.addProductToShoppingCart(productsAmount);

    await CommonPage.navigateToMyCart();

    const productDetails = await CartPage.getProductDetailsByName(productName);
    await expect(Number(productDetails.amount)).toEqual(productsAmount);

    const amountText = `${productsAmount} item${productsAmount > 1 && "s"}`;
    await expect(await CartPage.getTotalCartProducts()).toEqual(amountText);

    const parsePrice = detailedProduct.price.replace("$", "");
    const totalPrice = (Number(parsePrice) * productsAmount).toFixed(2);

    await expect(CartPage.totalCartPrice).toHaveText(`$${totalPrice}`);
  });

  it("TC-011 - should decrease product quantity in cart", async () => {
    const productName = detailedProduct.name;
    const initialAmount = 5;
    const amountToRemove = 2;
    const expectedAmount = initialAmount - amountToRemove;

    await CatalogPage.tapProductByName(productName);
    await ProductPage.addProductToShoppingCart(initialAmount);
    await CommonPage.navigateToMyCart();

    for (let i = 0; i < amountToRemove; i++) {
      await CartPage.decreaseProductQuantity(productName);
    }

    const productDetails = await CartPage.getProductDetailsByName(productName);
    await expect(Number(productDetails.amount)).toEqual(expectedAmount);
  });

  it("TC-012 - should display empty cart after removing all products", async () => {
    const productName = detailedProduct.name;
    const amount = 3;

    await CatalogPage.tapProductByName(productName);
    await ProductPage.addProductToShoppingCart(amount);
    await CommonPage.navigateToMyCart();

    for (let i = 0; i < amount; i++) {
      await CartPage.decreaseProductQuantity(productName);
    }

    await expect(CartPage.emptyCartTitle).toBeDisplayed();
    await expect(CartPage.emptyCartDescription).toBeDisplayed();
    await expect(CartPage.emptyCartGoShoppingButton).toBeDisplayed();
  });
});
