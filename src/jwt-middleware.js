const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./secret");

// 미들웨어
exports.jwtMiddleware = async function (req, res, next) {
  // 헤더에서 토큰 꺼내기
  const token = req.headers["x-access-token"];
  console.log(`token=`, token);
  // 토근이 없는 경우
  if (!token) {
    return res.send({
      isSuccess: false,
      code: 403,
      message: "로그인이 되어 있지 않습니다",
    });
  }

  // 토큰이 있는 경우, 토큰 검증
  try {
    const verifiedToken = jwt.verify(token, jwtSecret);
    console.log(`req.verifiedToken=`, verifiedToken);
    req.verifiedToken = verifiedToken;
    next();
  } catch (err) {
    return res.send({
      isSuccess: false,
      code: 403,
      message: "토큰 검증 실패",
    });
  }
};
