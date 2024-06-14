const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
async function validateRegistration(req, res, next) {
	let errors = [];
	if (!req.body.name) {
		errors.push(
			new AppError(
				["Rider's Name not found in the incoming request in the correct form"],
				StatusCodes.BAD_REQUEST
			)
		);
	}

	if (!req.body.email) {
		errors.push(
			new AppError(
				["Rider's email not found in the incoming request in the correct form"],
				StatusCodes.BAD_REQUEST
			)
		);
	}

	if (!req.body.contact) {
		errors.push(
			new AppError(
				[
					"Rider's contact not found in the incoming request in the correct form",
				],
				StatusCodes.BAD_REQUEST
			)
		);
	}

	if (!req.body.password) {
		errors.push(
			new AppError(
				[
					"Rider's password not found in the incoming request in the correct form",
				],
				StatusCodes.BAD_REQUEST
			)
		);
	}

	if (!req.body.home_town) {
		errors.push(
			new AppError(
				[
					"Rider's Home Town not found in the incoming request in the correct form",
				],
				StatusCodes.BAD_REQUEST
			)
		);
	}

	if (errors.length > 0) {
		const ErrorResponse = {
			messages: "Something went wrong while registering the rider",
			errors: errors,
		};
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}

	next();
}

async function validateLoginRequest(req, res, next) {
	let errors = [];
	if (!req.body.email) {
		errors.push(
			new AppError(
				["Rider's email not found in the incoming request in the correct form"],
				StatusCodes.BAD_REQUEST
			)
		);
	}
	if (!req.body.password) {
		errors.push(
			new AppError(
				[
					"Rider's password not found in the incoming request in the correct form",
				],
				StatusCodes.BAD_REQUEST
			)
		);
	}
	if (errors.length > 0) {
		const ErrorResponse = {
			messages: "Something went wrong while registering the rider",
			errors: errors,
		};
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	next();
}
module.exports = {
	validateRegistration,
	validateLoginRequest,
};
