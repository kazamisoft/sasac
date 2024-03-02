const indexController = require("../controller/index-controller.js");

exports.indexRouter = function (app) {
  // 유저목록을 조회
  //app.get("/users/:userIdx", indexController.getUsers);
  app.get("/users", indexController.getUsers);
  // 특정 유저에 대해서 조회
  app.get("/user", indexController.getUser);
  //
  app.post("/user", indexController.postUser);
  //
  // app.put("/user", indexRouter.putUser);
};
