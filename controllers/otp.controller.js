const { v4: uuidv4 } = require("uuid");
const otpGenerator = require("otp-generator");
const pool = require("../config/db");
const { addMinute } = require("../helpers/add_minute");
const { encode, decode } = require("../services/crypt.js");

const newOTP = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const otp = otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const now = new Date();
    const expiration_time = addMinute(now, 5);

    const newOtp = await pool.query(
      `INSERT INTO otp (id, otp, expiration_time) VALUES ($1, $2, $3) RETURNING *`,
      [uuidv4(), otp, expiration_time]
    );

    const details = {
      timestap: now,
      phone_number: phone_number,
      otp_id: newOtp.rows[0].id,
    };

    const encodedData = await encode(JSON.stringify(details));

    res.status(201).send({ status: "Success", encodedData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { otp, phone_number, verification_key } = req.body;
    const currentDateTime = new Date();
    const decodedData = await decode(verification_key);
    const parsedData = JSON.parse(decodedData);

    if (parsedData.phone_number !== phone_number) {
      return res.status(400).send({
        status: "Failure",
        Details: "OTP wasn't sent to this particular phone number",
      });
    }

    const otpResult = await pool.query("SELECT * FROM otp where id = $1", [
      parsedData.otp_id,
    ]);
    const result = otpResult.rows[0];
    if (result) {
      if (!result.verified) {
        if (result.expiration_time > currentDateTime) {
          if (result.otp == otp) {
            await pool.query(`UPDATE otp SET verified = $1 WHERE id = $2`, [
              true,
              result.id,
            ]);

            const clientResult = await pool.query(
              `SELECT * FROM clients WHERE phone_number = $1`,
              [phone_number]
            );
            let client_id, client_status;

            if (clientResult.rows.length === 0) {
              const newClient = await pool.query(
                `INSERT INTO clients (phone_number, otp_id, is_active) VALUES ($1, $2, $3) RETURNING id`,
                [phone_number, parsedData.otp_id, true]
              );
              client_id = newClient.rows[0].id;
              client_status = "new";
            } else {
              client_id = clientResult.rows[0].id;
              client_status = "old";
              await pool.query(
                `UPDATE clients SET otp_id = $2, is_active = true WHERE id = $1`,
                [client_id, parsedData.otp_id]
              );
            }

            return res.send({
              Status: "Success",
              Details: client_status,
              PhoneNumber: phone_number,
              ClientId: client_id,
            });
          } else {
            return res.status(400).send({
              status: "Failure",
              Details: "OTP not matched",
            });
          }
        } else {
          return res.status(400).send({
            status: "Failure",
            Details: "OTP expired",
          });
        }
      } else {
        return res.status(400).send({
          status: "Failure",
          Details: "OTP already verified",
        });
      }
    } else {
      return res.status(400).send({
        status: "Failure",
        Details: "OTP not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  newOTP,
  verifyOTP,
};
