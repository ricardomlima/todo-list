const { setup: setupDevServer } = require("jest-dev-server");

module.exports = async function globalSetup() {
  await setupDevServer({
    command: `LOCAL_DDB_PORT=4566 serverless offline start`,
    launchTimeout: 50000,
    port: 3000,
  });
};
