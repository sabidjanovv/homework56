const {Router} = require('express');

const { addSocial, getSocials, updateSocial, deleteSocial, getSocialById } = require('../controllers/social.controller');

const router = Router();

router.post('/add', addSocial);

router.get("/get", getSocials);

router.put("/update/:id", updateSocial);

router.delete("/delete/:id", deleteSocial);

router.get("/get/:id", getSocialById);

module.exports = router;