const axios = require("axios");

const ENDPOINT = "http://localhost:3000";

test("get tasks returns empty list", async () => {
  const response = await axios.get(`${ENDPOINT}/`);
  const expectedResult = [];
  expect(response.data).toEqual(expectedResult);
});
