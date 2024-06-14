const CrudRepository = require("./crud-repository");
const { Rider } = require("../models");
class RiderRepository extends CrudRepository {
	constructor() {
		super(Rider);
	}

	async getRiderByEmail(email) {
		try {
			const rider = await Rider.findOne({
				where: {
					email: email,
				},
			});
			return rider;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = RiderRepository;
