module.exports = {
  globalSetup: "<rootDir>/global-setup.js",
  globalTeardown: "<rootDir>/global-tear-down.js",
  setupFiles: ["<rootDir>/test-config/aws-config.js"],
};

jest.setTimeout(30000);
