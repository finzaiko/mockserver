"use strict";

const reqmaker = require("./reqmaker");
const env = require("node:process");
const got = require("got");
const fastify = require("fastify")({ logger: false });
fastify.register(require("@fastify/cors"), { origin: "*" });

console.log("SERVER_URL= ", env.env.SERVER_URL);

// base on path count: https://jsonplaceholder.typicode.com/
const totalCount = {
  posts: 100,
  comments: 500,
  albums: 100,
  photos: 5000,
  todos: 200,
  users: 10,
};

fastify.get("/", function (req, reply) {
  reply.send({
    hello: "world",
    posts: `${env.env.SERVER_IP}:${env.env.SERVER_PORT}/api/posts`,
    comments: `${env.env.SERVER_IP}:${env.env.SERVER_PORT}/api/comments`,
    albums: `${env.env.SERVER_IP}:${env.env.SERVER_PORT}/api/albums`,
    photos: `${env.env.SERVER_IP}:${env.env.SERVER_PORT}/api/photos`,
    todos: `${env.env.SERVER_IP}:${env.env.SERVER_PORT}/api/todos`,
    users: `${env.env.SERVER_IP}:${env.env.SERVER_PORT}/api/users`,
  });
});

fastify.get("/api/:path", async (req, reply) => {
  let { start, limit } = req.query;
  if (!start) {
    start = 0;
  }
  if (!limit) {
    limit = 20;
  }
  let data;
  try {
    data = await got
      .get(
        `${env.env.SERVER_URL}/${req.params.path}?_start=${start}&_limit=${limit}`
      )
      .json();
  } catch (ex) {
    return reply.code(400).send(ex);
  }
  const res = {
    status: 200,
    message: "Get all data",
    error: false,
    data: data,
    pos: parseInt(start),
    total_count: totalCount[req.params.path],
  };

  reply.code(res.status).send(res);
});

fastify.get("/api/:path/:id", async (req, reply) => {
  let data;
  try {
    data = await got
      .get(`${env.env.SERVER_URL}/${req.params.path}/${req.params.id}`)
      .json();
  } catch (ex) {
    return reply.code(400).send(ex);
  }
  const res = {
    status: 200,
    message: "Get detail",
    error: false,
    data: data,
  };

  reply.code(res.status).send(res);
});

fastify.post("/api/:path", async (req, reply) => {
  let data;
  console.log("LOG: ", req.body);
  try {
    data = await got
      .post(`${env.env.SERVER_URL}/${req.params.path}`, req.body)
      .json();
  } catch (ex) {
    return reply.code(400).send(ex);
  }
  const res = {
    status: 201,
    message: "Create data",
    error: false,
    data: data,
  };
  reply.code(res.status).send(res);
});

fastify.put("/api/:path/:id", async (req, reply) => {
  let data;
  try {
    data = await got
      .put(
        `${env.env.SERVER_URL}/${req.params.path}/${req.params.id}`,
        req.body
      )
      .json();
  } catch (ex) {
    return reply.code(400).send(ex);
  }
  const res = {
    status: 200,
    message: "Update data",
    error: false,
    data: data,
  };
  reply.code(res.status).send(res);
});

fastify.delete("/api/:path/:id", async (req, reply) => {
  let data;
  try {
    data = await got
      .delete(`${env.env.SERVER_URL}/${req.params.path}/${req.params.id}`)
      .json();
  } catch (ex) {
    return reply.code(400).send(ex);
  }
  const res = {
    status: 200,
    message: "Delete data",
    error: false,
    data: data,
  };
  reply.code(res.status).send(res);
});

fastify.listen(
  { port: env.env.SERVER_PORT || 3000, host: "0.0.0.0" },
  (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
);
