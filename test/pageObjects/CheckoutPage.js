class CheckoutPage {
  get toPaymentButton() {
    return $("~To Payment button");
  }

  get shippingErrorMessages() {
    return {
      fullName: $("~Full Name*-error-message").$("android.widget.TextView"),
      address: $("~Address Line 1*-error-message").$("android.widget.TextView"),
      city: $("~City*-error-message").$("android.widget.TextView"),
      zip: $("~Zip Code*-error-message").$("android.widget.TextView"),
      country: $("~Country*-error-message").$("android.widget.TextView"),
    };
  }
}

module.exports = new CheckoutPage();
