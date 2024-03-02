const {pool} = require("../database.js");

// 사용자 목록
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

// user todos
exports.getUserTodos = async function(userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      console.log("db connection ok");

      const selectTodoQuery = 
          `SELECT * from tododb.Todos WHERE userIdx = ${userIdx};`;
      const [rows] = await connection.query(selectTodoQuery);
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

// user todos
exports.getTodoByType = async function(userIdx, type) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      console.log("db connection ok");

      const selectTodoQuery = 
          `SELECT todoIdx, contents, type from tododb.Todos WHERE userIdx = ${userIdx} and type = "${type}";`;
      const [rows] = await connection.query(selectTodoQuery);
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

// todo 생성
exports.insertTodo = async function(userIdx, contents, type) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const insertTodoQuery = 
          `INSERT INTO tododb.Todos (userIdx, contents, type) VALUES(?, ?, ?);`;
          // `INSERT INTO tododb.Todos (userIdx, contents, type) VALUES(${userIdx}, "${contents}", "${type}")`;
      const insertTodoParams = [userIdx, contents, type]; 
      // const result = await connection.query(insertTodoQuery);
      const [row] = await connection.query(insertTodoQuery, insertTodoParams);
      console.log(`insert result=`, [row]);
      connection.release();
      return row;
    }
    catch (err) {
      console.log(`createTodo:`, err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.log(`connection error=`, err);
    return false;
  }
}
