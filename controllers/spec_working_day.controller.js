const pool = require("../config/db");

const addSpecWorkingDay = async (req, res) => {
  try {
    const {
      spec_id,
      day_of_week,
      start_time,
      finish_time,
      rest_start_time,
      rest_finish_time,
    } = req.body;
    const newSpecWorkingDay = await pool.query(
      `INSERT INTO spec_working_day (spec_id, day_of_week, start_time, finish_time, rest_start_time, rest_finish_time) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        spec_id,
        day_of_week,
        start_time,
        finish_time,
        rest_start_time,
        rest_finish_time,
      ]
    );
    res.status(201).send(newSpecWorkingDay.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getSpecWorkingDays = async (req, res) => {
  try {
    const specWorkingDays = await pool.query("SELECT * FROM spec_working_day");
    res.status(200).send(specWorkingDays.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getSpecWorkingDayById = async (req, res) => {
  try {
    const { id } = req.params;
    const specWorkingDay = await pool.query(
      "SELECT * FROM spec_working_day WHERE id=$1",
      [id]
    );
    res.status(200).send(specWorkingDay.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const updateSpecWorkingDay = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      spec_id,
      day_of_week,
      start_time,
      finish_time,
      rest_start_time,
      rest_finish_time,
    } = req.body;
    const updatedSpecWorkingDay = await pool.query(
      `UPDATE spec_working_day SET spec_id=$1, day_of_week=$2, start_time=$3, finish_time=$4, rest_start_time=$5, rest_finish_time=$6 WHERE id=$7 RETURNING *`,
      [
        spec_id,
        day_of_week,
        start_time,
        finish_time,
        rest_start_time,
        rest_finish_time,
        id,
      ]
    );
    res.status(200).send(updatedSpecWorkingDay.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteSpecWorkingDay = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM spec_working_day WHERE id=$1", [id]);
    res.status(200).send(`Spec working day with id ${id} has been deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = {
  addSpecWorkingDay,
  getSpecWorkingDays,
  getSpecWorkingDayById,
  updateSpecWorkingDay,
  deleteSpecWorkingDay,
};
