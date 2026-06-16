const CatalogPage = require("../pageObjects/CatalogPage");
const { products } = require("../data/products");
const {
  getAllElementTextsByScrolling,
  waitElementForDisplayed,
} = require("../helpers/ui");

describe("US-02 - Product Catalog and Filters", () => {
  it("TC-004 - should display all products on catalog page", async () => {
    await CatalogPage.catalogPageHeaderText.waitForDisplayed();
    const displayedProducts = CatalogPage.productItemList;

    await expect(displayedProducts).toBeElementsArrayOfSize(products.length);
  });

  it("TC-005 - should sort products by name ascending", async () => {
    await CatalogPage.catalogPageHeaderText.waitForDisplayed();
    await CatalogPage.sortButton.click();
    await CatalogPage.sortByNameAscendingButton.click();
    // Wait for first product to be rendered after sort
    await waitElementForDisplayed(CatalogPage.productItemTitle);

    const displayedProductsNames = await getAllElementTextsByScrolling(
      CatalogPage.productItemTitleSelector,
      products.length,
    );

    const expectedNamesAsc = [...products]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((p) => p.name);

    await expect(displayedProductsNames).toEqual(expectedNamesAsc);
  });

  it("TC-006 - should sort products by name descending", async () => {
    await CatalogPage.catalogPageHeaderText.waitForDisplayed();
    await CatalogPage.sortButton.click();
    await CatalogPage.sortByNameDescendingButton.click();
    // Wait for first product to be rendered after sort
    await waitElementForDisplayed(CatalogPage.productItemTitle);

    const displayedProductsNames = await getAllElementTextsByScrolling(
      CatalogPage.productItemTitleSelector,
      products.length,
    );

    const expectedNamesDesc = [...products]
      .sort((a, b) => -1 * a.name.localeCompare(b.name))
      .map((p) => p.name);

    await expect(displayedProductsNames).toEqual(expectedNamesDesc);
  });
});
