class CommonPage {
  get sidebarToggler() {
    return $("~open menu");
  }

  get loginSidebarButton() {
    return $("~menu item log in");
  }

  async navigateToLoginPage() {
    await this.sidebarToggler.click();
    await this.loginSidebarButton.click();
  }
}

module.exports = new CommonPage();
