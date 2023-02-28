const { Joi, celebrate } = require("celebrate");
const express = require("express");
const router = express.Router();
const Auth = require("../../operations/Auth");

router.post(
  "/createUser",
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  Auth.createUser
);
router.post(
  "/login",
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  Auth.login
);
router.post(
  "/logout",
  celebrate({
    body: Joi.object({
      _id: Joi.string().required(),
    }),
  }),
  Auth.logout
);
router.post(
  "/updateUser",
  celebrate({
    body: Joi.object({
      _id: Joi.string().required(),
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    }),
  }),
  Auth.updateUser
);

exports.Router = router;
