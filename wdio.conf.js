const path = require("path");

async function resetApp() {
  await driver.terminateApp("com.saucelabs.mydemoapp.rn");
  await driver.executeScript("mobile: clearApp", [
    {
      appId: "com.saucelabs.mydemoapp.rn",
    },
  ]);
  await driver.activateApp("com.saucelabs.mydemoapp.rn");
}

async function dismissPopupIfPresent() {
  try {
    const okBtn = await $(
      'android=new UiSelector().resourceId("android:id/button2")',
    );
    await okBtn.waitForDisplayed({ timeout: 3000 });
    await okBtn.click();
  } catch (e) {
    // No popup found, continuing
  }
}

exports.config = {
  runner: "local",
  port: 4723,

  specs: ["./test/specs/**/*.js"],

  maxInstances: 1,

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "emulator-5554",
      "appium:platformVersion": "17.0",
      "appium:automationName": "UiAutomator2",
      "appium:app": path.join(process.cwd(), "apps", "MyDemoApp-v1.3.0.apk"),
      "appium:appWaitActivity": "*",
      "appium:noReset": false,
    },
  ],

  logLevel: "error",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [],

  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  beforeTest: async function () {
    await dismissPopupIfPresent();
  },

  afterTest: async function () {
    await resetApp();
  },
};
