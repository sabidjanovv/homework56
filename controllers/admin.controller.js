const pool = require("../config/db");

const addAdmin = async (req, res) => {
  try {
    const {
      name,
      phone_number,
      email,
      hashed_password,
      is_active,
      is_creator,
    } = req.body;

    const newAdmin = await pool.query(
      `
      INSERT INTO admins (
      name,
      phone_number,
      email,
      hashed_password,
      is_active,
      is_creator
    )
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
      `,
      [name, phone_number, email, hashed_password, is_active, is_creator]
    );
    console.log(newAdmin);
    res.status(201).send(newAdmin.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await pool.query("SELECT * FROM admins");
    res.status(200).send(admins.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      phone_number,
      email,
      hashed_password,
      is_active,
      is_creator,
    } = req.body;
    const updatedAdmin = await pool.query(
      `
      UPDATE admins
      SET name=$1, phone_number=$2, email=$3, hashed_password=$4, is_active=$5, is_creator=$6
      WHERE id=$7
      RETURNING *
      `,
      [name, phone_number, email, hashed_password, is_active, is_creator, id]
    );
    res.status(200).send(updatedAdmin.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await pool.query("DELETE FROM admins WHERE id=$1", [
      id,
    ]);
    res.status(200).send(`Admin with id ${id} has been deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await pool.query("SELECT * FROM admins WHERE id=$1", [id]);
    res.status(200).send(admin.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = {
  addAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  getAdminById,
};
