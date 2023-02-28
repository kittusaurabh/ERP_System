const { Joi, celebrate } = require("celebrate");
const express = require("express");
const router = express.Router();
const superAdminController = require("./superAdminController");

router.post(
  "/createUser",
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  superAdminController.createUser
);
router.post(
  "/login",
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  superAdminController.login
);
router.post(
  "/logout",
  celebrate({
    body: Joi.object({
      _id: Joi.string().required(),
    }),
  }),
  superAdminController.logout
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
  superAdminController.updateUser
);

exports.Router = router;
