async function getAllElementTextsByScrolling(
  selector,
  expectedCount = Infinity,
) {
  const collected = new Set();
  let previousSource = "";

  while (collected.size < expectedCount) {
    // Add element text to collected ignoring duplicated
    const elements = await $$(selector);
    for (const el of elements) {
      const text = await el.getText();
      collected.add(text);
    }

    const currentSource = await driver.getPageSource();
    if (currentSource === previousSource) break; // Bottom's page
    previousSource = currentSource;

    if (collected.size >= expectedCount) break;

    await driver.execute("mobile: scrollGesture", {
      left: 100,
      top: 200,
      width: 300,
      height: 500,
      direction: "down",
      percent: 0.5,
    });
  }

  return Array.from(collected);
}

async function waitElementForDisplayed(element) {
  await element.waitForDisplayed({ timeout: 5000 });
}

module.exports = { getAllElementTextsByScrolling, waitElementForDisplayed };
