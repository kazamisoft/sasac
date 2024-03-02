const mysql = require("mysql2/promise")

exports.pool = mysql.createPool({
  host: "kazamisoft.site",
  user: "dbadmin",
  port: "3306",
  password: "admin123",
  database: "tododb",
  // database: "kakaodb",
});