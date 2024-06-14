const { StatusCodes } = require("http-status-codes");
const { riderServive } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function registerRider(req, res) {
	try {
		const rider = await riderServive.registeRider({
			name: req.body.name,
			email: req.body.email,
			contact: req.body.contact,
			password: req.body.password,
			home_town: req.body.home_town,
		});
		SuccessResponse.messages = "Rider's details added SuccessFully";
		SuccessResponse.data = rider;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function login(req, res) {
	try {
		const tokens = await riderServive.login({
			email: req.body.email,
			password: req.body.password,
		});
		SuccessResponse.messages = "Login SuccessFul";
		SuccessResponse.data = tokens.accessToken;
		res.cookie("x-refresh-token", tokens.refreshToken, { httpOnly: true });
		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = {
	registerRider,
	login,
};
