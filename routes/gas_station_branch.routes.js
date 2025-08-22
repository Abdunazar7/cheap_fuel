const {
  createGasStationBranch,
  getGasStationBranches,
  getOneGasStationBranch,
  updateGasStationBranch,
  deleteGasStationBranch,
} = require("../controllers/gas_station_branch.controller");

const router = require("express").Router();

router.post("/", createGasStationBranch);
router.get("/", getGasStationBranches);
router.get("/:id", getOneGasStationBranch);
router.patch("/:id", updateGasStationBranch);
router.delete("/:id", deleteGasStationBranch);

module.exports = router;
