const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/ERPSystem", {
    // useCreateIndex:true,
    // useNewUrlParser: true,
    // useUnifiedTopology:true
  })

  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.log(err, "Connection Failed");
  });
