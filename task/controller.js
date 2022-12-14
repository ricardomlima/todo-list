const createTask = async (event, context) => {
  return {
    statusCode: 201,
    body: "ok",
  };
};

module.exports = { createTask };
