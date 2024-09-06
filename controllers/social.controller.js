const pool = require("../config/db");

const addSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;

    const newSocial = await pool.query(
      `
      INSERT INTO socials (social_name, social_icon_file)
      VALUES ($1, $2) RETURNING *
      `,
      [social_name, social_icon_file]
    );
    console.log(newSocial);
    res.status(201).send(newSocial.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getSocials = async (req, res) => {
  try {
    const socials = await pool.query("SELECT * FROM socials");
    res.status(200).send(socials.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const updateSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const { social_name, social_icon_file } = req.body;
    const updatedSocial = await pool.query(
      `
      UPDATE socials
      SET social_name=$1, social_icon_file=$2
      WHERE id=$3
      RETURNING *
      `,
      [social_name, social_icon_file, id]
    );
    res.status(200).send(updatedSocial.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSocial = await pool.query("DELETE FROM socials WHERE id=$1", [
      id,
    ]);
    res.status(200).send(`Social with id ${id} has been deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getSocialById = async (req, res) => {
  try {
    const { id } = req.params;
    const social = await pool.query("SELECT * FROM socials WHERE id=$1", [id]);
    res.status(200).send(social.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = {
  addSocial,
  getSocials,
  updateSocial,
  deleteSocial,
  getSocialById,
};
