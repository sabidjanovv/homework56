const {Router} = require('express');

const { addSpecialist, getSpecialists, updateSpecialist, deleteSpecialist, getSpecialistById } = require('../controllers/specialist.controller');

const router = Router();

router.post('/add', addSpecialist);

router.get("/get", getSpecialists);

router.put("/update/:id", updateSpecialist);

router.delete("/delete/:id", deleteSpecialist);

router.get("/get/:id", getSpecialistById);

module.exports = router;