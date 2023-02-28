const jwt = require("jsonwebtoken");
const md5 = require("md5");
const User = require("../../model/user");

exports.createUser = async (req, res) => {
  let userData = req.body;
  userData.email = userData.email;

  userData.password = md5(userData.password);

  var token = jwt.sign(
    {
      email: userData.email,
    },
    "supersecret"
  );
  userData.accessToken = token;
  try {
    let isExists = await User.findOne({
      $or: [
        {
          email: userData.email,
        },
        {
          password: userData.password,
        },
      ],
    });
    if (isExists) {
      return res.status(400).json({
        message: "Email Or Phone Number Already Exists",
      });
    }
    var users = await User.create(userData);
    return res.status(200).json({
      data: users,
      message: "Successfully Created",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
exports.login = async (req, res) => {
  let userData = req.body;

  try {
    let users = await User.findOne({
      email: userData.email,
      password: md5(req.body.password),
    });

    if (!users) {
      return res.status(403).json({
        message: "Incorrect email or password",
      });
    }
    if (users.isProfileCreated == false) {
      return res
        .status(400)
        .json({ message: "Please complete your profile before logging in" });
    }
    var token = jwt.sign(
      {
        email: userData.email,
      },
      "supersecret"
    );
    let update = await User.findOneAndUpdate(
      {
        email: userData.email,
      },
      {
        $set: {
          accessToken: token,
        },
      },
      {
        new: true,
      }
    );

    delete users.password;

    return res.status(200).json({
      data: update,
      message: "Successfully logged in",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });

    return res.status(200).json({
      data: user,
      message: "Updated",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.body._id,
      {
        accessToken: "",
      },
      {
        new: true,
      }
    );
    if (user) {
      return res.status(200).json({
        message: "Successfully Logged Out",
      });
    }
    return res.status(400).json({
      message: "Could Not Logout, Please Try Again",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
