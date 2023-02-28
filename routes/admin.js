const { Joi, celebrate } = require("celebrate");
const express = require("express");
const router = express.Router();
const Auth = require("../operations/auth");
const isApiOwner = require("../utility/middleware");



router.post(
    "/login",
    celebrate({
        body: Joi.object({
            email: Joi.string().lowercase().optional(),
            password: Joi.string().required(),
            role: 'admin'
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
        role: 'admin'

    }),
    Auth.logout
);
router.post(
    "/createUser",
    celebrate({
        body: Joi.object({
            email: Joi.string().lowercase().required(),
            password: Joi.string().required(),
            role: Joi.string().default("principal")
        }),
    }), isApiOwner.verifyToken,
    Auth.createUser
);
router.post(
    "/updateUser",
    celebrate({
        body: Joi.object({
            _id: Joi.string().required(),
            email: Joi.string().lowercase().optional(),
            password: Joi.string().optional(),
            role: 'principal'
        }),
    }),
    isApiOwner.verifyToken,
    Auth.updateUser
);

exports.Router = router;
