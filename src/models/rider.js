"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { serverConfig } = require("../config");

module.exports = (sequelize, DataTypes) => {
	class Rider extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Rider.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			contact: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: true,
			},
			home_town: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Rider",
		}
	);
	Rider.beforeCreate(function encrypt(rider) {
		const salt = bcrypt.genSaltSync(serverConfig.SALT_ROUNDS);
		const encryptedPassword = bcrypt.hashSync(rider.password, salt);
		rider.password = encryptedPassword;
	});
	return Rider;
};
