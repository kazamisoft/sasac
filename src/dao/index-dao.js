const {pool} = require("../database.js");

exports.getUserRows = async function() {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      console.log("db connection ok");

      const selectUserQuery = "SELECT * from Users;";
      const [rows] = await connection.query(selectUserQuery);
      connection.release();
      return [rows];
    }
    catch (err) {
      console.log(`query error=${err}`)
      connection.release();
    }
    finally {
      // 반드시 들어가야 한다.
    }
  } catch (err) {
    console.log(`connection err=${err}`);
    return false;
  }
}

