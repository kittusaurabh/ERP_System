let mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let usersSchema = mongoose.Schema(
  {
    accessToken: {
      type: String,
      require: true,
    },
    userId: String,
    email: {
      type: String,
    },
    verificationCode: String,
    isVerified: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "principal", "teacher", "student", "parents"],
    },
  },
  {
    timestamps: true,
  }
);

let users = new mongoose.model("users", usersSchema);

users.findOne({ role: "admin" }).then((res) => {
  if (!res) {
    var token = jwt.sign(
      {
        email: "admin@gmail.com",
      },
      "supersecret"
    );
    users.create({
      accessToken: token,
      email: "admin@gmail.com",
      role: "admin",
      password: "25d55ad283aa400af464c76d713c07ad", //12345678
    });
  }
});
module.exports = users;
