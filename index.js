"use strict";

const reqmaker = require("./reqmaker");
const fastify = require("fastify")({ logger: false });
fastify.register(require("@fastify/cors"), { origin: "*" });

fastify.get("/", function (req, reply) {
  reply.send({ hello: "world" });
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
    data = await reqmaker({
      url: `https://jsonplaceholder.typicode.com/${req.params.path}?_start=${start}&_limit=${limit}`,
      method: "GET",
    });
  } catch (ex) {
    return reply.code(400).send(ex);
  }
  const res = {
    status: 200,
    message: "Get all data",
    error: false,
    data: data,
  };

  reply.code(res.status).send(res);
});

fastify.get("/api/:path/:id", async (req, reply) => {
  let data;
  try {
    data = await reqmaker({
      url: `https://jsonplaceholder.typicode.com/${req.params.path}/${req.params.id}`,
      method: "GET",
    });
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
    data = await reqmaker({
      url: `https://jsonplaceholder.typicode.com/${req.params.path}`,
      method: "POST",
      data: req.body,
    });
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
    data = await reqmaker({
      url: `https://jsonplaceholder.typicode.com/${req.params.path}`,
      method: "POST",
      data: req.body,
    });
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
    data = await reqmaker({
      url: `https://jsonplaceholder.typicode.com/${req.params.path}/${req.params.id}`,
      method: "DELETE",
      data: req.body,
    });
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

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
