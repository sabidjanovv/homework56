const {Router} = require('express');

const {
  addToken,
  getTokens,
  getTokenById,
  updateToken,
  deleteToken,
} = require("../controllers/token.controller");

const router = Router();

router.post("/add", addToken);
router.get("/get", getTokens)
router.get("/:id", getTokenById);
router.put("/update/:id", updateToken);
router.delete("/delete/:id", deleteToken);

module.exports = router;