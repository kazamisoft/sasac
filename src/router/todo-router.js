const todoController = require("../controller/todo-controller");

exports.todoRouter = function(app) {
  app.get("/users", todoController.getUsers);
  app.post("/todo", todoController.createTodo);
  app.get("/user/:userIdx/todos", todoController.readTodo);
  app.patch("/todo", todoController.updateTodo);

  app.get(
    "/dummy",
    function(req, res, next) {
      console.log(1);
      next();
    },
    function(req, res, next) {
      console.log(2);
      next();
    },
    function(req, res, next) {
      console.log(3);
      return;
    }
  )
};