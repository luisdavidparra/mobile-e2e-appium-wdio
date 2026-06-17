async function getAllItemsByScrolling(
  parentSelector,
  childSelectors,
  expectedCount = Infinity,
) {
  const collected = new Map();
  let previousCount = 0;

  await $(parentSelector).waitForDisplayed({ timeout: 5000 });

  while (collected.size < expectedCount) {
    const items = await $$(parentSelector);

    for (const item of items) {
      try {
        const result = {};
        for (const { key, selector } of childSelectors) {
          const child = await item.$(selector);
          if (!(await child.isExisting())) continue;
          result[key] = await child.getText();
        }
        if (Object.keys(result).length === childSelectors.length) {
          collected.set(result[childSelectors[0].key], result);
        }
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

async function waitElementForDisplayed(element) {
  await element.waitForDisplayed({ timeout: 5000 });
}

module.exports = {
  getAllItemsByScrolling,
  waitElementForDisplayed,
};
