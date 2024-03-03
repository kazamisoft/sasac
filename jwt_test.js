const jwt = require("jsonwebtoken");

const token = jwt.sign(
  {key: 1},
  "secret",   // 서버만 알고있는 비밀키
);

console.log(token);

const verifiedToken = jwt.verify(token, "secret");
console.log(verifiedToken);