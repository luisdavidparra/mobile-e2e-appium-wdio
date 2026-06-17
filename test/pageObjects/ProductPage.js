class CatalogPage {
  async titleByName(name) {
    return $(`android=new UiSelector().text("${name}")`);
  }

  get price() {
    return $("~product price");
  }

  get description() {
    return $("~product description");
  }

  async colorOption(color) {
    return $(`~${color} circle`);
  }
}

module.exports = new CatalogPage();
