async function getAllProductsByScrolling(
  CatalogPage,
  expectedCount = Infinity,
) {
  const collected = new Map();
  let previousCount = 0;

  await $(CatalogPage.productItemSelector).waitForDisplayed({ timeout: 5000 });

  while (collected.size < expectedCount) {
    const items = await $$(CatalogPage.productItemSelector);

    for (const item of items) {
      try {
        const nameElement = await item.$(CatalogPage.productItemTitleSelector);
        const priceElement = await item.$(CatalogPage.productItemPriceSelector);

        if (
          !(await nameElement.isExisting()) ||
          !(await priceElement.isExisting())
        )
          continue;

        const name = await nameElement.getText();
        const price = await priceElement.getText();

        collected.set(name, { name, price });
      } catch (e) {
        console.error(e);
      }
    }

    if (collected.size >= expectedCount) break;
    if (collected.size === previousCount) break; // No new items = bottom of list

    previousCount = collected.size;

    await driver.execute("mobile: scrollGesture", {
      left: 100,
      top: 200,
      width: 300,
      height: 500,
      direction: "down",
      percent: 0.5,
    });
  }

  return Array.from(collected.values());
}

async function sortCatalog(CatalogPage, optionButton) {
  await CatalogPage.catalogPageHeaderText.waitForDisplayed();
  await CatalogPage.sortButton.click();
  await optionButton.click();

  // Wait for first product to be rendered after sort
  await waitElementForDisplayed(CatalogPage.productItemTitle);
}

async function waitElementForDisplayed(element) {
  await element.waitForDisplayed({ timeout: 5000 });
}

module.exports = {
  getAllProductsByScrolling,
  sortCatalog,
  waitElementForDisplayed,
};
