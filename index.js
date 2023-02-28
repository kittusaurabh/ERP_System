const express = require("express");
const db = require("./db");
const superAdminRouter =
  require("./modules/superAdmin/superAdminRouter").Router;
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.use("/superAdmin", superAdminRouter);

app.listen(port, () => {
  console.log("Connection is set on", port);
});
