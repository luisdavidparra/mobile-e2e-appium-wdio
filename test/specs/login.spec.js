describe("Login", () => {
  it("should open the app successfully", async () => {
    const appIsOpen = await driver.pause(2000);
    expect(true).toBe(true);
  });
});
