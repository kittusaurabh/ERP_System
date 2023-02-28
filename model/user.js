let mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let usersSchema = mongoose.Schema(
  {
    accessToken: {
      type: String,
      require: true,
    },
    superAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "STUDENT", "PRINCIPAL", "TEACHER"],
    },
  },
  {
    timestamps: true,
  }
);

let users = new mongoose.model("users", usersSchema);

users.findOne({ role: "SUPERADMIN" }).then((res) => {
  if (!res) {
    var token = jwt.sign(
      {
        email: "superadmin",
      },
      "supersecret"
    );
    users.create({
      accessToken: token,
      superAdmin: true,
      email: "superadmin",
      role: "ADMIN",
      password: "e10adc3949ba59abbe56e057f20f883e", //123456
    });
  }
});
module.exports = users;
