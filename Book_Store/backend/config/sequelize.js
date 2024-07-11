const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.SQL_DB_NAME,
  process.env.SQL_DB_USER,
  process.env.SQL_DB_PASSWORD,
  {
    host: process.env.SQL_DB_HOST,
    dialect: process.env.SQL_DIALECT,
    port: process.env.SQL_DB_PORT || 3306,
    logging: console.log,
  }
);

module.exports = sequelize;
