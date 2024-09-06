const {Router} = require('express');

const {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

const router = Router();

router.post("/add", addService);
router.get("/get", getServices);
router.get("/get/:id", getServiceById);
router.put("/update/:id", updateService);
router.delete("/delete/:id", deleteService);

module.exports = router;