module.exports = {
  standard: {
    username: "bob@example.com",
    password: "10203040",
    shippingInfo: {
      fullName: "Bob",
      address: "Street 123",
      city: "Barcelona",
      zipCode: "01234",
      country: "Spain",
    },
    cardInfo: {
      fullName: "Bob",
      cardNumber: "1234 1234 1234 1234",
      expirationDate: "03/25",
      securityCode: "123",
    },
  },
  invalid: {
    username: "invalid@username.com",
    password: "invalidpassword",
  },
};
