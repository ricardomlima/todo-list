const AWS = require("aws-sdk");
const axios = require("axios");

const STAGE = process.env.STAGE;

let endpoint;
let dynamoDbClient;
let tasksTable;

if (STAGE === "local") {
  dynamoDbClient = new AWS.DynamoDB.DocumentClient({
    endpoint: "http://localhost:4566",
    region: "local",
  });
  endpoint = "http://localhost:3000";
  tasksTable = "tasks-table-local";
} else {
  tasksTable = `tasks-table-${STAGE}`;
  dynamoDbClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1",
  });
  endpoint = process.env.API_URL;
}

const deleteTableItems = async () => {
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
  await deleteTableItems();
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

test("delete task endpoint deletes item from database", async () => {
  const taskId = "random_id2";
  const taskObject = {
    taskId: taskId,
    title: "my new task",
  };
  const postResponse = await axios.post(`${endpoint}/`, taskObject);

  expect(postResponse.status).toEqual(201);
  expect(postResponse.data).toEqual(taskObject);

  const getResponse = await axios.get(`${endpoint}/`);

  expect(getResponse.data).toEqual([taskObject]);

  await axios.delete(`${endpoint}/${taskId}`);

  const getResponseAfterDelete = await axios.get(`${endpoint}/`);

  expect(getResponseAfterDelete.data).toEqual([]);
});

test("update task endpoint updates item from database", async () => {
  const taskId = "random_id3";
  const taskObject = {
    taskId: taskId,
    title: "my new task",
  };
  const postResponse = await axios.post(`${endpoint}/`, taskObject);

  expect(postResponse.status).toEqual(201);
  expect(postResponse.data).toEqual(taskObject);

  const getResponse = await axios.get(`${endpoint}/`);

  expect(getResponse.data).toEqual([taskObject]);

  const newTaskObject = {
    title: "my other new task",
  };

  await axios.post(`${endpoint}/${taskId}`, newTaskObject);

  const getResponseAfterDelete = await axios.get(`${endpoint}/`);

  expect(getResponseAfterDelete.data).toEqual([{ taskId, ...newTaskObject }]);
});
