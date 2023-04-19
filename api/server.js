const express = require("express");

const server = express();
server.use(express.json());

const carsRouter = require("./cars/cars-router");
server.use("/api/cars", carsRouter);

server.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "Server is up and ruuning!",
  });
});

module.exports = server;
