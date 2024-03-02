const indexDao = require("../dao/index-dao.js");

exports.getUsers = async function (req, res) {
  try {
    console.log(`HTTP GET /users`);

    // 구조분해해서 값만 뽑아낸다.
    const {userIdx} = req.params;
    console.log(`param=`, userIdx);

    // 헤더 토큰
    const token = req.headers["x-access-token"];
    console.log(`token`, token);

    const [userRows] = await indexDao.getUserRows();
    console.log(`userRow`, userRows);
    // res.send(userRows);
    res.json(userRows);
  } catch (err) {
    console.log(err);
  }
  //return res.send("it works");
  res.end();
};

exports.getUser = function (req, res) {
  console.log(`HTTP GET /user`);
  const {age} = req.query;
  console.log(`age=${age}`);
  const name = req.body.name;
  res.send(name);
  res.end();
};

exports.postUser = function (req, res) {

  // Req객체에서 body를 뽑아내는 구조분해 할당방식을 사용해라
  const {nickname } = req.body;
  console.log(`HTTP POST /user`);
  res.send('{ name: "jason"}');
};

exports.putUser = function (req, res) {
  res.send("PUT");
};