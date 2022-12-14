const controller = require("../task/controller.js");

test("create task returns 'ok'", async () => {
  const result = await controller.createTask();
  const expectedResult = {
    statusCode: 201,
    body: "ok",
  };
  expect(result).toEqual(expectedResult);
});
