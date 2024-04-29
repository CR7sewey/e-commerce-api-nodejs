require("express-async-errors");
require("dotenv").config();

// express
const express = require("express");
const app = express();

// packages
const morgan = require("morgan");

// ROUTERS
const routerAuth = require("./routes/authRoutes");

// Middlewares
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const dbConnection = require("./db/connect");

// Middlewares
app.use(morgan("tiny")); // to check routes and http codes
app.use(express.json()); // access to json data in req.body

//

app.use("/api/v1/auth", routerAuth);

app.get("/", (req, res) => {
  res.send("E-commerce Project");
});

// Middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);

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
