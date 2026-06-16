const CatalogPage = require("../pageObjects/CatalogPage");
const { products } = require("../data/products");
const {
  getAllProductsByScrolling,
  sortCatalog,
  waitElementForDisplayed,
} = require("../helpers/ui");

describe("US-02 - Product Catalog and Filters", () => {
  it("TC-004 - should display all products on catalog page", async () => {
    await CatalogPage.catalogPageHeaderText.waitForDisplayed();
    const displayedProducts = CatalogPage.productItemList;

    await expect(displayedProducts).toBeElementsArrayOfSize(products.length);
  });

  it("TC-005 - should sort products by name ascending", async () => {
    await sortCatalog(CatalogPage, CatalogPage.sortByNameAscendingButton);

    const displayedProducts = await getAllProductsByScrolling(
      CatalogPage,
      products.length,
    );
    const displayedNames = displayedProducts.map((pro) => pro.name);

    const expectedNamesAsc = [...products]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((p) => p.name);

    await expect(displayedNames).toEqual(expectedNamesAsc);
  });

  it("TC-006 - should sort products by name descending", async () => {
    await sortCatalog(CatalogPage, CatalogPage.sortByNameDescendingButton);

    const displayedProducts = await getAllProductsByScrolling(
      CatalogPage,
      products.length,
    );
    const displayedNames = displayedProducts.map((pro) => pro.name);

    const expectedNamesDesc = [...products]
      .sort((a, b) => -1 * a.name.localeCompare(b.name))
      .map((p) => p.name);

    await expect(displayedNames).toEqual(expectedNamesDesc);
  });

  it("TC-007 - should sort products by price ascending", async () => {
    await sortCatalog(CatalogPage, CatalogPage.sortByPriceAscendingButton);

    const displayedProducts = await getAllProductsByScrolling(
      CatalogPage,
      products.length,
    );
    const displayedPrices = displayedProducts.map((pro) => pro.price);

    const parsePrice = (price) => parseFloat(price.replace("$", ""));
    const expectedPricesAsc = [...products]
      .sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
      .map((p) => p.price);

    await expect(displayedPrices).toEqual(expectedPricesAsc);
  });

  it("TC-008 - should sort products by price descending", async () => {
    await sortCatalog(CatalogPage, CatalogPage.sortByPriceDescendingButton);

    const displayedProducts = await getAllProductsByScrolling(
      CatalogPage,
      products.length,
    );
    const displayedPrices = displayedProducts.map((pro) => pro.price);

    const parsePrice = (price) => parseFloat(price.replace("$", ""));
    const expectedPricesDesc = [...products]
      .sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
      .map((p) => p.price);

    await expect(displayedPrices).toEqual(expectedPricesDesc);
  });
});
