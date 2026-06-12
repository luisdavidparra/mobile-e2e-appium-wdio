# Saucelabs Appium Android - Mobile QA Automation

Mobile test automation suite for the Sauce Labs My Demo App (Android).

## Tech Stack

- Appium
- Javascript (Node.js)
- WebdriverIO
- UiAutomator2
- Mocha

## Test Coverage

| User Story | Description | Tests |
|------------|-------------|-------|
| US-01 | Authentication | 3 |
| US-02 | Catalog & Filters | 5 |
| US-03 | Cart Management | 4 |
| US-04 | Checkout | 3 |

## Prerequisites

- Node.js 18
- Android Studio + AVD (Android 17)
- Java JDK 11

## Setup

```bash
npm install
appium driver install uiautomator2
```

## Run Tests

1. Start Appium server in a separate terminal:
```bash
appium
```

2. Run the test suite:
```bash
npm test
```
