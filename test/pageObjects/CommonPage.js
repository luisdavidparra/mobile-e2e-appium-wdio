class CommonPage {
  get sidebarToggler() {
    return $("~open menu");
  }

  get loginSidebarButton() {
    return $("~menu item log in");
  }

  get logoutSidebarButton() {
    return $("~menu item log out");
  }

  get confirmLogoutButton() {
    return $('android=new UiSelector().resourceId("android:id/button1")');
  }

  get logoutAlertSuccessMessage() {
    return $('android=new UiSelector().resourceId("android:id/alertTitle")');
  }

  get logoutAlertAcceptButton() {
    return $('android=new UiSelector().resourceId("android:id/button1")');
  }

  async navigateToLoginPage() {
    await this.sidebarToggler.click();
    await this.loginSidebarButton.click();
  }

  async logout() {
    await this.sidebarToggler.click();
    await this.logoutSidebarButton.click();
    await this.confirmLogoutButton.click();
  }
}

module.exports = new CommonPage();
