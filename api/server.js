const express = require("express");

const server = express();

server.use(express.json());

const userCars = require("./cars/cars-router");

server.use("/api/cars", userCars);

server.get("/", (req, res) => {
  res.json({ message: "Hey, server is up and running..." });
});

module.exports = server;
