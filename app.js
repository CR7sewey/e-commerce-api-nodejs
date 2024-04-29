const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("E-commerce Project");
});

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // later db connection
    app.listen(port, () => {
      console.log("Im listening on port ", port);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
