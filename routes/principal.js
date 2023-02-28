const { Joi, celebrate } = require("celebrate");
const express = require("express");
const router = express.Router();
const Auth = require("../operations/auth");
const isApiOwner = require("../utility/middleware");


router.post(
    "/login",
    celebrate({
        body: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
            role: 'principal'
        }),
    }),
    Auth.login
);

exports.Router = router;
