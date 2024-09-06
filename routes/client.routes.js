const {Router} = require('express');
const { addClient, getClients, updateClient, deleteClient, getClientById } = require('../controllers/client.controller');

const router = Router();

router.post('/add', addClient);

router.get("/get", getClients);

router.put("/update/:id", updateClient);

router.delete("/delete/:id", deleteClient);

router.get("/get/:id", getClientById);

module.exports = router;