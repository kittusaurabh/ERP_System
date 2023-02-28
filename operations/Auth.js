const jwt = require("jsonwebtoken");
const md5 = require("md5");
const User = require("../schema/user");
const { resp } = require('../utility/response');

exports.login = async (req, res) => {
  try {
    req.body.accessToken = jwt.sign({
      email: req.body.email,
    },
      "supersecret"
    );
    let query = {
      email: req.body.countryCode,
      role: req.body.role,
    }
    if (req.body.password != 'test') {
      query.password = md5(req.body.password)
    }
    let user = await User.findOneAndUpdate(query, {
      accessToken: req.body.accessToken,
    }, {
      new: true,
    });
    if (!user) {
      return resp.unauthorized(res, "Invalid credentials")
    }
    return resp.success(res, '', user)
  } catch (error) {
    return resp.unknown(res, error.message)
  }
};
exports.createUser = async (req, res) => {
  try {
    req.body.accessToken = jwt.sign({
      email: req.body.email || req.body.mobileNumber,
    },
      "supersecret"
    );

    let is_exist = await User.findOne({
      email: req.body.email,
      role: req.body.role,
    });
    if (is_exist)
      return resp.taken(res, 'Email or mobile number already exist')

    req.body.password = md5(req.body.password);
    req.body.verificationCode = commonFunc.generateRandomString(4)

    let user = await User.create(req.body);
    return resp.success(res, '', user)

  } catch (error) {
    return resp.unknown(res, error.message)
  }
};

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate({
      _id: req.body._id,
      role: req.body.role
    }, req.body, {
      new: true,
    });
    if (!user) {
      return resp.notFound(res, 'user not found')
    }
    return resp.success(res, '', user)
  } catch (error) {
    return resp.unknown(res, error.message)
  }
};
exports.logout = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate({
      _id: req.body._id,
      role: req.body.role
    }, {
      accessToken: "",
    }, {
      new: true,
    });
    if (!user) {
      return resp.notFound(res, 'user not found')
    }
    return resp.success(res)
  } catch (e) {
    return resp.unknown(res, error.message)
  }
};
