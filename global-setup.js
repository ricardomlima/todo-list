const { setup: setupDevServer } = require("jest-dev-server");

module.exports = async function globalSetup() {
  await setupDevServer({
    command: `serverless offline start && serverless dynamodb migrate`,
    launchTimeout: 50000,
    port: 3000,
  });
};
