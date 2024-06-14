const express = require("express");

const router = express.Router();

const { riderMiddleware } = require("../../middlewares");
const { riderController } = require("../../controllers");

router.post(
	"/register",
	riderMiddleware.validateRegistration,
	riderController.registerRider
);

router.get(
	"/login",
	riderMiddleware.validateLoginRequest,
	riderController.login
);

module.exports = router;
