const LoginPage = require("../pageObjects/LoginPage");
const CommonPage = require("../pageObjects/CommonPage");
const ProductsPage = require("../pageObjects/ProductsPage");
const { standard } = require("../data/user");

describe("US-01 - Authentication", () => {
  it("TC-001 - should login with valid credentials", async () => {
    await CommonPage.navigateToLoginPage();
    await LoginPage.login(standard.username, standard.password);

    await expect(ProductsPage.productsPageHeaderText).toBeDisplayed();
  });
});
