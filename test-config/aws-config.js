const AWS = require("aws-sdk");
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-json-file.html
AWS.config.loadFromPath("./testconfig.json");
