const AWS = require("aws-sdk");
const axios = require("axios");

const isOffline = process.env.IS_OFFLINE;
const STAGE = process.env.STAGE;

let endpoint;
let dynamoDbClient;
let tasksTable;

if (isOffline === "true") {
  dynamoDbClient = new AWS.DynamoDB.DocumentClient({
    endpoint: "http://localhost:4566",
    region: "local",
  });
  endpoint = "http://localhost:3000";
  tasksTable = "tasks-table-local";
} else {
  tasksTable = `tasks-table-${STAGE}`;
  dynamoDbClient = new AWS.DynamoDB.DocumentClient();
  endpoint = process.env.API_URL;
}

const resetTable = async () => {
  const params = {
    TableName: tasksTable,
  };

  let data = await dynamoDbClient.scan({ TableName: tasksTable }).promise();

  for (const item of data.Items) {
    await dynamoDbClient
      .delete({
        TableName: tasksTable,
        Key: {
          taskId: item.taskId,
        },
      })
      .promise();
  }
};

beforeEach(async () => {
  await resetTable();
});

test("get tasks returns empty list", async () => {
  const response = await axios.get(`${endpoint}/`);
  const expectedResult = [];
  expect(response.data).toEqual(expectedResult);
});

test("create task endpoint adds item to database", async () => {
  const taskObject = {
    taskId: "random_id",
    title: "my new task",
  };
  const postResponse = await axios.post(`${endpoint}/`, taskObject);

  expect(postResponse.status).toEqual(201);
  expect(postResponse.data).toEqual(taskObject);

  const getResponse = await axios.get(`${endpoint}/`);

  expect(getResponse.data).toEqual([taskObject]);
});
