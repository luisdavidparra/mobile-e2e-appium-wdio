class LoginPage {
  get usernameInput() {
    return $("~Username input field");
  }

  get passwordInput() {
    return $("~Password input field");
  }

  get loginButton() {
    return $("~Login button");
  }

  get invalidCredentialsMessage() {
    return $(
      'android=new UiSelector().text("Provided credentials do not match any user in this service.")',
    );
  }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}

module.exports = new LoginPage();
