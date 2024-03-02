const todoController = require("../controller/todo-controller");

exports.todoRouter = function(app) {
  app.get("/users", todoController.getUsers);
  app.post("/todo", todoController.createTodo);
  app.get("/user/:userIdx/todos", todoController.readTodo);

};