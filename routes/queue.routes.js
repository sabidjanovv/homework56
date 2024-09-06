const {Router} = require('express');

const {
  addQueue,
  getQueues,
  getQueueById,
  updateQueue,
  deleteQueue,
} = require("../controllers/queue.controller");

const router = Router();

router.post("/add", addQueue);
router.get("/get", getQueues);
router.get("/:id", getQueueById);
router.put("/update/:id", updateQueue);
router.delete("/delete/:id", deleteQueue);

module.exports = router;