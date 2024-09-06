const pool = require("../config/db");

const addService = async (req, res) => {
  try {
    const { service_name, service_price } = req.body;
    const newService = await pool.query(
      `INSERT INTO service (service_name, service_price) 
       VALUES ($1, $2) RETURNING *`,
      [service_name, service_price]
    );
    res.status(201).send(newService.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await pool.query("SELECT * FROM service");
    res.status(200).send(services.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await pool.query("SELECT * FROM service WHERE id=$1", [id]);
    res.status(200).send(service.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { service_name, service_price } = req.body;
    const updatedService = await pool.query(
      `UPDATE service SET service_name=$1, service_price=$2 WHERE id=$3 RETURNING *`,
      [service_name, service_price, id]
    );
    res.status(200).send(updatedService.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM service WHERE id=$1", [id]);
    res.status(200).send(`Service with id ${id} has been deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
