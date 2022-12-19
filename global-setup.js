const { setup: setupDevServer } = require("jest-dev-server");

module.exports = async function globalSetup() {
  const stage = (process.env.STAGE && process.env.STAGE.length > 0) || "local";
  await setupDevServer({
    command: `serverless offline start --stage=${stage}`,
    launchTimeout: 50000,
    port: 3000,
  });
};
