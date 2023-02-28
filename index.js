const express = require("express");
require("./db");
const Admin = require("./routes/admin").Router;
const port = process.env.PORT || 8000;
const app = express();
const errors = require('celebrate');

app.use(express.json());
app.use(errors());

app.use("/admin", Admin);

app.listen(port, () => {
  console.log("Backend is listening on", port);
});
