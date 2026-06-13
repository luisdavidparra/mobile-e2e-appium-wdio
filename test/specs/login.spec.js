const LoginPage = require("../pageObjects/LoginPage");
const CommonPage = require("../pageObjects/CommonPage");
const ProductsPage = require("../pageObjects/ProductsPage");
const { standard, invalid } = require("../data/user");

describe("US-01 - Authentication", () => {
  it("TC-001 - should login with valid credentials", async () => {
    await CommonPage.navigateToLoginPage();
    await LoginPage.login(standard.username, standard.password);

    await expect(ProductsPage.productsPageHeaderText).toBeDisplayed();
  });

  it("TC-002 - should display error message with invalid credentials", async () => {
    await CommonPage.navigateToLoginPage();
    await LoginPage.login(invalid.username, invalid.password);

    await expect(LoginPage.invalidCredentialsMessage).toBeDisplayed();
  });

  it("TC-003 - should logout successfully", async () => {
    await CommonPage.navigateToLoginPage();
    await LoginPage.login(standard.username, standard.password);

    await CommonPage.logout();

    await expect(CommonPage.logoutAlertSuccessMessage).toBeDisplayed();
    await CommonPage.logoutAlertAcceptButton.click();

    await expect(LoginPage.usernameInput).toBeDisplayed();
  });
});
