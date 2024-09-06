const {Router} = require('express');

const {
  addSpecWorkingDay,
  getSpecWorkingDays,
  getSpecWorkingDayById,
  updateSpecWorkingDay,
  deleteSpecWorkingDay,
} = require("../controllers/spec_working_day.controller");

const router = Router();

router.post("/add", addSpecWorkingDay);
router.get("/get", getSpecWorkingDays);
router.get("/get/:id", getSpecWorkingDayById);
router.put("/update/:id", updateSpecWorkingDay);
router.delete("/delete/:id", deleteSpecWorkingDay);

module.exports = router;


