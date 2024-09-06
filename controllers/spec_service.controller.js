const pool = require("../config/db");

const addSpecService = async (req, res) => {
  try {
    const { spec_id, service_id, spec_service_price } = req.body;
    const newSpecService = await pool.query(
      `INSERT INTO spec_service (spec_id, service_id, spec_service_price) 
       VALUES ($1, $2, $3) RETURNING *`,
      [spec_id, service_id, spec_service_price]
    );
    res.status(201).send(newSpecService.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getSpecServices = async (req, res) => {
  try {
    const specServices = await pool.query("SELECT * FROM spec_service");
    res.status(200).send(specServices.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getSpecServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const specService = await pool.query(
      "SELECT * FROM spec_service WHERE id=$1",
      [id]
    );
    res.status(200).send(specService.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const updateSpecService = async (req, res) => {
  try {
    const { id } = req.params;
    const { spec_id, service_id, spec_service_price } = req.body;
    const updatedSpecService = await pool.query(
      `UPDATE spec_service SET spec_id=$1, service_id=$2, spec_service_price=$3 WHERE id=$4 RETURNING *`,
      [spec_id, service_id, spec_service_price, id]
    );
    res.status(200).send(updatedSpecService.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteSpecService = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM spec_service WHERE id=$1", [id]);
    res.status(200).send(`Spec service with id ${id} has been deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = {
  addSpecService,
  getSpecServices,
  getSpecServiceById,
  updateSpecService,
  deleteSpecService,
};
