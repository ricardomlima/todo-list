const { setup: setupDevServer } = require("jest-dev-server");

module.exports = async function globalSetup() {
  const stage = (process.env.STAGE.length > 0 && process.env.STAGE) || "local";
  await setupDevServer({
    command: `serverless offline start --stage=${stage}`,
    launchTimeout: 50000,
    port: 3000,
  });
};
