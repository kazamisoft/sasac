const todoController = require("../controller/todo-controller");
const { jwtMiddleware } = require("../jwt-middleware");

exports.todoRouter = function (app) {
  app.get("/users", jwtMiddleware, todoController.getUsers);
  app.post("/todo", jwtMiddleware, todoController.createTodo);
  //app.get("/user/:userIdx/todos", jwtMiddleware, todoController.readTodo);
  // token을 사용하여 조회
  app.get("/todos", jwtMiddleware, todoController.readTodo);
  app.patch("/todo", jwtMiddleware, todoController.updateTodo);
  app.delete("/todo/:todoIdx", jwtMiddleware, todoController.deleteTodo);
  /*
  app.get(
    "/dummy",
    function (req, res, next) {
      console.log(1);
      next();
    },
    function (req, res, next) {
      console.log(2);
      next();
    },
    function (req, res, next) {
      console.log(3);
      return;
    }
  );
  */
};
