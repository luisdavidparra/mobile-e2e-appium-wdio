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

    const productCartDetails = await CartPage.getCartItemByName(productName);
    await expect(Number(productCartDetails.amount)).toEqual(productsAmount);

    const amountText = `${productsAmount} item${productsAmount > 1 && "s"}`;
    await expect(await CartPage.getTotalCartProducts()).toEqual(amountText);

    const parsePrice = detailedProduct.price.replace("$", "");
    const totalPrice = (Number(parsePrice) * productsAmount).toFixed(2);

    await expect(CartPage.totalCartPrice).toHaveText(`$${totalPrice}`);
  });
});
