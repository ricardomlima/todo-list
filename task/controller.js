const AWS = require("aws-sdk");

const tasksTable = process.env.TASKS_TABLE;
const isOffline = process.env.IS_OFFLINE;

let dynamoDbClient;
let client;
if (isOffline === "true") {
  dynamoDbClient = new AWS.DynamoDB.DocumentClient({
    endpoint: "http://dynamodb:4566",
    region: "local",
  });
  client = new AWS.DynamoDB({
    endpoint: "http://dynamodb:4566",
    region: "local",
  });
} else {
  dynamoDbClient = new AWS.DynamoDB.DocumentClient();
}

const getTasks = async (event, context) => {
  const params = {
    TableName: tasksTable,
  };
  // const data = await dynamoDbClient.scan(params).promise();
  const data = await client.listTables().promise();

  // const tasks = JSON.stringify(data.Items);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

const createTask = async (event, context) => {
  return {
    statusCode: 201,
    body: "Hello World",
  };
};

module.exports = { createTask, getTasks };
