require("express-async-errors");
require("dotenv").config();

// express
const express = require("express");
const app = express();

// packages
const morgan = require("morgan");
const cookie_parser = require("cookie-parser");

// ROUTERS
const routerAuth = require("./routes/authRoutes");
const routerUser = require("./routes/userRoutes");
const routerProduct = require("./routes/productRoutes");

// Middlewares
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const { tokenExists } = require("./middlewares/authentication");
const dbConnection = require("./db/connect");

// Middlewares
app.use(morgan("tiny")); // to check routes and http codes
app.use(express.json()); // access to json data in req.body
app.use(cookie_parser(process.env.COOKIE_SECRET_KEY));
//

app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/users", routerUser);
app.use("/api/v1/products", routerProduct);

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
