const pool = require("../config/db");

const addToken = async (req, res) => {
  try {
    const { client_id, token } = req.body;
    const newToken = await pool.query(
      `INSERT INTO token (client_id, token) 
       VALUES ($1, $2) RETURNING *`,
      [client_id, token]
    );
    res.status(201).send(newToken.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getTokens = async (req, res) => {
  try {
    const tokens = await pool.query("SELECT * FROM token");
    res.status(200).send(tokens.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getTokenById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = await pool.query("SELECT * FROM token WHERE id=$1", [id]);
    res.status(200).send(token.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const updateToken = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, token } = req.body;
    const updatedToken = await pool.query(
      `UPDATE token SET client_id=$1, token=$2 WHERE id=$3 RETURNING *`,
      [client_id, token, id]
    );
    res.status(200).send(updatedToken.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteToken = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM token WHERE id=$1", [id]);
    res.status(200).send(`Token with id ${id} has been deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = {
  addToken,
  getTokens,
  getTokenById,
  updateToken,
  deleteToken,
};
