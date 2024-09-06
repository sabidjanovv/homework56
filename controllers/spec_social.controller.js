const pool = require("../config/db");

const addSpecSocial = async (req, res) => {
  try {
    const { spec_id, social_id, link } = req.body;
    const newSpecSocial = await pool.query(
      `INSERT INTO spec_social (spec_id, social_id, link) 
       VALUES ($1, $2, $3) RETURNING *`,
      [spec_id, social_id, link]
    );
    res.status(201).send(newSpecSocial.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getSpecSocials = async (req, res) => {
  try {
    const specSocials = await pool.query("SELECT * FROM spec_social");
    res.status(200).send(specSocials.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getSpecSocialById = async (req, res) => {
  try {
    const { id } = req.params;
    const specSocial = await pool.query(
      "SELECT * FROM spec_social WHERE id=$1",
      [id]
    );
    res.status(200).send(specSocial.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const updateSpecSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const { spec_id, social_id, link } = req.body;
    const updatedSpecSocial = await pool.query(
      `UPDATE spec_social SET spec_id=$1, social_id=$2, link=$3 WHERE id=$4 RETURNING *`,
      [spec_id, social_id, link, id]
    );
    res.status(200).send(updatedSpecSocial.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteSpecSocial = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM spec_social WHERE id=$1", [id]);
    res.status(200).send(`Spec social with id ${id} has been deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = {
  addSpecSocial,
  getSpecSocials,
  getSpecSocialById,
  updateSpecSocial,
  deleteSpecSocial,
};
