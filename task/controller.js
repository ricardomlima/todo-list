const AWS = require("aws-sdk");

const tasksTable = process.env.TASKS_TABLE;
const isOffline = process.env.IS_OFFLINE;

let dynamoDbClient;

if (isOffline === "true") {
  dynamoDbClient = new AWS.DynamoDB.DocumentClient({
    endpoint: "http://localhost:4566",
    region: "local",
  });
} else {
  dynamoDbClient = new AWS.DynamoDB.DocumentClient();
}

const getTasks = async (event, context) => {
  const params = {
    TableName: tasksTable,
  };
  const data = await dynamoDbClient.scan(params).promise();
  const tasks = JSON.stringify(data.Items);

  return {
    statusCode: 200,
    body: tasks,
  };
};

const createTask = async (event, _) => {
  try {
    const taskObject = JSON.parse(event.body);

    const task = {
      taskId: "jobim",
      ...taskObject,
    };

    await dynamoDbClient
      .put({
        Item: task,
        TableName: tasksTable,
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify(task),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: "error",
    };
  }
};

module.exports = { createTask, getTasks };
