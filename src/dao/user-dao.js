const { pool } = require("../database");

exports.insertUser = async function (email, password, nickname) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const insertTodoQuery = `INSERT INTO tododb.Users (userIdx, email, password, nickname) VALUES('2', ?, ?, ?);`;
      const insertTodoParams = [email, password, nickname];
      const [row] = await connection.query(insertTodoQuery, insertTodoParams);
      console.log(`insert result=`, [row]);
      connection.release();
      return row;
    } catch (err) {
      console.log(`insertUser:`, err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.log(`connection error=`, err);
    return false;
  }
};

// user
exports.selectUserByEmail = async function (email) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      console.log("MySQL connected.");

      const selectTodoQuery = `SELECT * FROM tododb.Users WHERE email = "${email}";`;
      const [rows] = await connection.query(selectTodoQuery);
      console.log("Retun rows=", rows);
      connection.release();
      return [rows];
    } catch (err) {
      console.log(`query error=${err}`);
      connection.release();
    } finally {
      // 반드시 들어가야 한다.
    }
  } catch (err) {
    console.log(`connection err=${err}`);
    return false;
  }
};

// user
exports.selectUser = async function (email, password) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      console.log("MySQL connected.");
      const selectTodoQuery = `SELECT * FROM tododb.Users WHERE email = "${email}" and password = "${password}";`;
      const [rows] = await connection.query(selectTodoQuery);
      console.log("Retun rows=", rows);
      connection.release();
      return rows;
    } catch (err) {
      console.log(`query error=${err}`);
      connection.release();
    } finally {
      // 반드시 들어가야 한다.
    }
  } catch (err) {
    console.log(`connection err=${err}`);
    return false;
  }
};
