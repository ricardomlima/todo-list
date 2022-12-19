const axios = require("axios");

const isOffline = process.env.IS_OFFLINE;
let endpoint;

if (isOffline === "true") {
  endpoint = "http://localhost:3000";
} else {
  endpoint = process.env.API_URL;
}

test("get tasks returns empty list", async () => {
  const response = await axios.get(`${endpoint}/`);
  const expectedResult = [];
  expect(response.data).toEqual(expectedResult);
});
