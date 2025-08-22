const {
  createGasStationBranch,
  getGasStationBranches,
  getOneGasStationBranch,
  updateGasStationBranch,
  deleteGasStationBranch,
  searchGasStationBranch,
  getBranchesByGasStationName,
  getBranchesByFuelTypeName
} = require("../controllers/gas_station_branch.controller");

const router = require("express").Router();

router.get("/fuel", getBranchesByFuelTypeName);
router.get("/name", getBranchesByGasStationName);
router.get("/search", searchGasStationBranch);

router.post("/", createGasStationBranch);
router.get("/", getGasStationBranches);
router.get("/:id", getOneGasStationBranch);
router.patch("/:id", updateGasStationBranch);
router.delete("/:id", deleteGasStationBranch);

module.exports = router;
