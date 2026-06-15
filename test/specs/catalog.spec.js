const CommonPage = require("../pageObjects/CommonPage");
const CatalogPage = require("../pageObjects/CatalogPage");
const { products } = require("../data/products");

describe("US-02 - Product Catalog and Filters", () => {
  it("TC-004 - should display all products on catalog page", async () => {
    await CatalogPage.catalogPageHeaderText.waitForDisplayed();
    const allProducts = await CatalogPage.productItems;
    
    await expect(allProducts.length).toBe(products.length);
  });
});
