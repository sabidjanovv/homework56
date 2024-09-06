const pool = require("../config/db");
console.log(1);
const addClient = async (req, res) => {
  console.log(2);
  try {
    console.log(22);
    const { first_name, last_name, phone_number, info, photo } = req.body;
    const newClient = await pool.query(
      `
      INSERT INTO clients (first_name, last_name, phone_number, info, photo)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
      `,
      [first_name, last_name, phone_number, info, photo]
    );
    console.log(newClient);
    res.status(201).send(newClient.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await pool.query("SELECT * FROM clients");
    res.status(200).send(clients.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number, info, photo } = req.body;
    const updatedClient = await pool.query(
      `
      UPDATE clients
      SET first_name=$1, last_name=$2, phone_number=$3, info=$4, photo=$5
      WHERE id=$6
      RETURNING *
      `,
      [first_name, last_name, phone_number, info, photo, id]
    );
    res.status(200).send(updatedClient.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await pool.query("DELETE FROM clients WHERE id=$1", [
      id,
    ]);
    res.status(200).send(`Client with id ${id} has been deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.query("SELECT * FROM clients WHERE id=$1", [id]);
    res.status(200).send(client.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = {
  addClient,
  getClients,
  updateClient,
  deleteClient,
  getClientById,
};
