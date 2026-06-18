class CheckoutPage {
  get toPaymentButton() {
    return $("~To Payment button");
  }

  get reviewOrderButton() {
    return $("~Review Order button");
  }

  get shippingInfoInputs() {
    return {
      fullName: $("~Full Name* input field"),
      address: $("~Address Line 1* input field"),
      city: $("~City* input field"),
      zip: $("~Zip Code* input field"),
      country: $("~Country* input field"),
    };
  }

  get cardInfoInputs() {
    return {
      fullName: $("~Full Name* input field"),
      cardNumber: $("~Card Number* input field"),
      expirationDate: $("~Expiration Date* input field"),
      securityCode: $("~Security Code* input field"),
    };
  }

  get shippingInfoErrors() {
    return {
      fullName: $("~Full Name*-error-message").$("android.widget.TextView"),
      address: $("~Address Line 1*-error-message").$("android.widget.TextView"),
      city: $("~City*-error-message").$("android.widget.TextView"),
      zip: $("~Zip Code*-error-message").$("android.widget.TextView"),
      country: $("~Country*-error-message").$("android.widget.TextView"),
    };
  }

  get checkoutUserInfo() {
    return {
      address: $("~checkout delivery address").$$("android.widget.TextView"),
      payment: $("~checkout payment info").$$("android.widget.TextView"),
    };
  }

  async proceedToReviewOrder() {
    await this.reviewOrderButton.click(); // validates
    await this.reviewOrderButton.click(); // advances if no errors
  }

  async fillShippingInfo(info) {
    await this.shippingInfoInputs.fullName.setValue(info.fullName);
    await this.shippingInfoInputs.address.setValue(info.address);
    await this.shippingInfoInputs.city.setValue(info.city);
    await this.shippingInfoInputs.zip.setValue(info.zipCode);
    await this.shippingInfoInputs.country.setValue(info.country);
  }

  async fillPaymentInfo(info) {
    await this.cardInfoInputs.fullName.setValue(info.fullName);
    await this.cardInfoInputs.cardNumber.setValue(info.cardNumber);
    await this.cardInfoInputs.expirationDate.setValue(info.expirationDate);
    await this.cardInfoInputs.securityCode.setValue(info.securityCode);
  }
}

module.exports = new CheckoutPage();
