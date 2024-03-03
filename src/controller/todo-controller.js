const todoDao = require("../dao/todo-dao.js");

exports.getUsers = async function(req, res) {
  try {
    console.log(`HTTP GET /Users`);

    const [userRows] = await todoDao.getUserRows();
    console.log(`userRows`, userRows);
    res.send(userRows);
  } catch (err) {
    console.log(`query error`, err);
  }
  res.end();
}

exports.getTodos = async function(req, res) {
  try {
    console.log(`HTTP GET /user/:userIdx/todos`);

    const {userIdx} = req.params;
    // const [userTodos] = await todoDao.getUserTodos(userIdx);
    const [userTodos] = await todoDao.getTodoByType(userIdx, "do");
    res.send(userTodos);
  }
  catch (err) {
    console.log(`query error`, err);
  }
  res.end();
}

exports.readTodo = async function(req, res) {
  try {
    const {userIdx} = req.params;

    const todos = {};
    const types = ["do", "decide", "delegate", "delete"];

    for (let type of types) {
      let selectTodoByTypeRows = await todoDao.getTodoByType(userIdx, type);
      if (!selectTodoByTypeRows) {
          return res.send({
            isSuccess: false,
            code: 400,
            message: "컨텐츠의 글자가 20이 넘었습니다."
          });
      }

      todos[type] = selectTodoByTypeRows;
    }

    res.send({
      result: todos,
      isSuccess: true,
      code: 200,
      message: "성공"
    });
  }
  catch (err) {
    console.log(`query error`, err);
  }
}

exports.createTodo = async function(req, res) {
  try {
    console.log(`HTTP POST /todo`);

    const {userIdx, contents, type} = req.body;
    console.log("[", userIdx, "],[", contents, "],[", type, "]");
    if (!userIdx || !contents || !type) {
      return res.send({
        isSuccess: false,
        code: 400,
        message: "입력값이 누락되었습니다."
      });
    }

    // 내용체크
    if (contents.length > 20) {
      return res.send({
        isSuccess: false,
        code: 400,
        message: "컨텐츠의 글자가 20이 넘었습니다."
      });
    }

    const validTypes = ["do", "decide", "delete", "delegate"];
    if (!validTypes.includes(type)) {
      return res.send({
        isSuccess: false,
        code: 400,
        message: "유효한 타입이 아닙니다."
      });
    }

    const result = todoDao.insertTodo(userIdx, contents, type);
    if (result === false) {
      // res.send("NOTOK");
      return res.send({
        isSuccess: false,
        code: 403,
        message: "요청에 실패했습니다."
      });
    }
    // 성공하면,
    return res.send({
      isSuccess: true,
      code: 200,
      message: "성공"
    })
  } catch (err) {
    console.log(`createTodo:`, err)
  }
}

exports.updateTodo = async function(req, res) {
  try {
    console.log(`HTTP PATCH /todo`);

    const {todoIdx, userIdx, contents, type} = req.body;
    if (!todoIdx || !userIdx) {
      return res.send({
        isSuccess: false,
        code: 400,
        message: "입력값이 누락되었습니다."
      });
    }

    // 내용체크
    if (!contents) {
      contents = null;
    }
    if (!type) {
      type = null;
    }

    const result = todoDao.insertTodo(userIdx, contents, type);
    if (result === false) {
      // res.send("NOTOK");
      return res.send({
        isSuccess: false,
        code: 403,
        message: "요청에 실패했습니다."
      });
    }
    // 성공하면,
    return res.send({
      isSuccess: true,
      code: 200,
      message: "성공"
    })
  } catch (err) {
    console.log(`createTodo:`, err)
  }
}