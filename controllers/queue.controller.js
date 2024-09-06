const pool = require("../config/db");

const addQueue = async (req, res) => {
  try {
    const { spec_service_id, client_id, queue_date_time, queue_number } =
      req.body;
    const newQueue = await pool.query(
      `INSERT INTO queue (spec_service_id, client_id, queue_date_time, queue_number) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [spec_service_id, client_id, queue_date_time, queue_number]
    );
    res.status(201).send(newQueue.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getQueues = async (req, res) => {
  try {
    const queues = await pool.query("SELECT * FROM queue");
    res.status(200).send(queues.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getQueueById = async (req, res) => {
  try {
    const { id } = req.params;
    const queue = await pool.query("SELECT * FROM queue WHERE id=$1", [id]);
    res.status(200).send(queue.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const updateQueue = async (req, res) => {
  try {
    const { id } = req.params;
    const { spec_service_id, client_id, queue_date_time, queue_number } =
      req.body;
    const updatedQueue = await pool.query(
      `UPDATE queue SET spec_service_id=$1, client_id=$2, queue_date_time=$3, queue_number=$4 WHERE id=$5 RETURNING *`,
      [spec_service_id, client_id, queue_date_time, queue_number, id]
    );
    res.status(200).send(updatedQueue.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteQueue = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM queue WHERE id=$1", [id]);
    res.status(200).send(`Queue with id ${id} has been deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = {
  addQueue,
  getQueues,
  getQueueById,
  updateQueue,
  deleteQueue,
};
