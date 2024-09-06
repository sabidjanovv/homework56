const {Router} = require('express');

const {
  addSpecSocial,
  getSpecSocials,
  getSpecSocialById,
  updateSpecSocial,
  deleteSpecSocial,
} = require("../controllers/spec_social.controller");

const router = Router();

router.post("/add", addSpecSocial);
router.get("/get", getSpecSocials);
router.get("/get/:id", getSpecSocialById);
router.put("/update/:id", updateSpecSocial);
router.delete("/delete/:id", deleteSpecSocial);

module.exports = router;


