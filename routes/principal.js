const { Joi, celebrate } = require("celebrate");
const express = require("express");
const router = express.Router();
const Auth = require("../operations/auth");
const isApiOwner = require("../utility/middleware");


router.post(
    "/login",
    celebrate({
        body: Joi.object({
            userId: Joi.string().required(),
            password: Joi.string().required(),
            role: Joi.string().default('principal')
        }),
    }),
    Auth.login
);

exports.Router = router;
