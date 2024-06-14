const express = require("express");

const router = express.Router();

const { infoController } = require("../../controllers");

const riderRoutes = require("./rider-routes");
router.get("/info", infoController.info);
router.use("/rider", riderRoutes);
module.exports = router;
