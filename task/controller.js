const createTask = async (event, context) => {
  return {
    statusCode: 201,
    body: "Hello World",
  };
};

module.exports = { createTask };
