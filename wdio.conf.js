const path = require("path");

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

  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [],

  framework: "mocha",
  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
