const mysql = require("mysql2/promise");
require("dotenv").config();

let pool;

const connectDB = async () => {
  if (!pool) {
    pool = mysql.createPool(process.env.DBURI);
  }

  try {
    const connection = await pool.getConnection();

    console.log("DB CONNECTED");
    connection.release();
  } catch (error) {
    console.log(`DB ERROR - ${error}`);
    process.exit(1);
  }

  return pool;
};

module.exports = connectDB;
