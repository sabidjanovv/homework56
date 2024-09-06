const {Router} = require('express');

const {
  addSpecService,
  getSpecServices,
  getSpecServiceById,
  updateSpecService,
  deleteSpecService,
} = require("../controllers/spec_service.controller");

const router = Router();

router.post("/add", addSpecService);
router.get("/get", getSpecServices);
router.get("/get/:id", getSpecServiceById);
router.put("/update/:id", updateSpecService);
router.delete("/delete/:id", deleteSpecService);

module.exports = router;