const controller = require("../task/controller.js");

test("create task returns 'Hello World'", async () => {
  const result = await controller.createTask();
  const expectedResult = {
    statusCode: 201,
    body: "Hello World",
  };
  expect(result).toEqual(expectedResult);
});
