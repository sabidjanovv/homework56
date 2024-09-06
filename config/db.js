const {Pool} = require('pg');
const config = require('config');

const pool = new Pool({
  user: config.get('db_username'),
  host: config.get('db_host'),
  database: config.get('db_name'),
  password: config.get('db_password'),
  port: config.get('db_port'),
})

module.exports = pool;