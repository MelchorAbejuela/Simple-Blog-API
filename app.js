const dbConnectFun = require("./db/db-connect");
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.static("./public"));
app.use(express.json());

const router = require("./routes/router");
app.use("/", router);

const pageNotFound = require("./middleware/page-not-found");
app.use(pageNotFound);

const errorHandler = require("./middleware/error-handler");
app.use(errorHandler);

const port = process.env.PORT || 4000;

const start = async () => {
  await dbConnectFun(process.env.DB_CONNECTION_STRING);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

start();
