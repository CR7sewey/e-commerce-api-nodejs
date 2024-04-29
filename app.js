const express = require("express");
const app = express();
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const dbConnection = require("./db/connect");

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("E-commerce Project");
});

// Middlewares
app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Im listening on port ", port);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
