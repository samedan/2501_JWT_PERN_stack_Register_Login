// const Pool = require("pg");
const pkg = require("pg");
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "9896",
  host: "localhost",
  port: 5432,
  database: "jwttutorial",
});

module.exports = pool;
