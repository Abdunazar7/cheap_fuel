const {
  createFuelType,
  getFuelType,
  getOneFuelType,
  updateFuelType,
  deleteFuelType,
} = require("../controllers/fuel_types.controller");

const router = require("express").Router();

router.post("/", createFuelType);
router.get("/", getFuelType);
router.get("/:id", getOneFuelType);
router.patch("/:id", updateFuelType);
router.delete("/:id", deleteFuelType);

module.exports = router;
