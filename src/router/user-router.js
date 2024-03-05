const userController = require("../controller/user-controller.js");
const { jwtMiddleware } = require("../jwt-middleware.js");

exports.userRouter = function (app) {
  app.post("/user", userController.signup);
  app.post("/sign-in", userController.signin);
  app.get("/jwt", jwtMiddleware, userController.getNicknameByToken);
};
