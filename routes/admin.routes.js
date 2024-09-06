const {Router} = require('express');

const { addAdmin, getAdmins, updateAdmin, deleteAdmin, getAdminById } = require('../controllers/admin.controller');

const router = Router();

router.post('/add', addAdmin);

router.get("/get", getAdmins);

router.put("/update/:id", updateAdmin);

router.delete("/delete/:id", deleteAdmin);

router.get("/get/:id", getAdminById);

module.exports = router;