const express = require("express");
require("./utility/conn");
const Admin = require("./routes/admin").Router;
const Principal = require("./routes/principal").Router;
const Teacher = require("./routes/teacher").Router;

const Common = require("./routes/common").Router;
const Student = require("./routes/student").Router;
const Parent = require("./routes/parent").Router;

const port = process.env.PORT || 8000;
const app = express();
const errors = require('celebrate');

app.use(express.json());
app.use(errors());

app.use("/admin", Admin);
app.use("/principal", Principal);
app.use("/teacher", Teacher);
app.use("/student", Student);
app.use("/parent", Parent);
app.use("/common", Common);



app.listen(port, () => {
  console.log("Backend is listening on", port);
});
