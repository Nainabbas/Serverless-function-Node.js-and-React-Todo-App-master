"use strict";

const connectToDatabase = require("./db");
function HTTPError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

const headers = {};

module.exports.healthCheck = async () => {
  await connectToDatabase();
  console.log("Connection successful.");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Connection successful." }),
  };
};

module.exports.create = async (event) => {
  try {
    const { Todo } = await connectToDatabase();
    const todo = await Todo.create(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: headers,
      body: JSON.stringify({ message: "Could not create the todo." }),
    };
  }
};

module.exports.getOne = async (event) => {
  try {
    const { Todo } = await connectToDatabase();

    const todo = await Todo.findOne({
      where: {
        id: event.pathParameters.id,
      },
    });
    if (!todo)
      throw new HTTPError(
        404,
        `Todo with id: ${event.pathParameters.id} was not found`
      );
    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: headers,
      body: JSON.stringify({
        message: err.message || "Could not fetch the Todo.",
      }),
    };
  }
};

module.exports.getAll = async () => {
  try {
    const { Todo } = await connectToDatabase();
    const todos = await Todo.findAll();
    return {
      statusCode: 200,
      body: JSON.stringify(todos),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: headers,
      body: JSON.stringify({
        message: err.message || "Could not fetch the Todos.",
      }),
    };
  }
};

module.exports.update = async (event) => {
  try {
    const input = JSON.parse(event.body);
    const { Todo } = await connectToDatabase();
    const todo = await Todo.findOne({
      where: {
        id: event.pathParameters.id,
      },
    });
    if (!todo)
      throw new HTTPError(
        404,
        `Todo with id: ${event.pathParameters.id} was not found`
      );
    if (input.title) todo.title = input.title;
    if (input.description) todo.description = input.description;
    if (input.status !== undefined) todo.status = input.status;
    await todo.save();
    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: headers,
      body: JSON.stringify({
        message: err.message || "Could not update the Todo.",
      }),
    };
  }
};

module.exports.destroy = async (event) => {
  try {
    const { Todo } = await connectToDatabase();
    const todo = await Todo.findOne({ id: event.pathParameters.id });
    if (!todo)
      throw new HTTPError(
        404,
        `Todo with id: ${event.pathParameters.id} was not found`
      );
    await todo.destroy();
    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: headers,
      body: JSON.stringify({
        message: err.message || "Could not destroy the Todo.",
      }),
    };
  }
};
