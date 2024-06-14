const { StatusCodes } = require("http-status-codes");
const { RiderRepository } = require("../repositories");
const riderRepositroy = new RiderRepository();
const AppError = require("../utils/errors/app-error");
const { Auth } = require("../utils/common");

async function registeRider(data) {
	try {
		const rider = await riderRepositroy.create(data);
		return rider;
	} catch (error) {
		let explanation = [];
		if (
			error.name == "SequelizeValidationError" ||
			error.name == "SequelizeUniqueConstraintError"
		) {
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});
			throw new AppError(explanation.join(", "), StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Cannot register the rider",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function login(data) {
	try {
		const rider = await riderRepositroy.getRiderByEmail(data.email);
		if (!rider) {
			throw new AppError(
				"Rider is not registered with following email address",
				StatusCodes.BAD_REQUEST
			);
		}
		console.log(data);
		const passwrordMatch = await Auth.checkPassword(
			data.password,
			rider.dataValues.password
		);
		if (!passwrordMatch) {
			throw new AppError("Incorrect Password", StatusCodes.BAD_REQUEST);
		}
		const accessToken = await Auth.createAccessToken({
			id: rider.id,
			name: rider.name,
		});
		const refreshToken = await Auth.createRefreshToken({
			id: rider.id,
			name: rider.name,
		});
		return { accessToken, refreshToken };
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			"Something Went Wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
module.exports = {
	registeRider,
	login,
};
