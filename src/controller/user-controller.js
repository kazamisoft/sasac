const userDao = require("../dao/user-dao.js");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../secret.js");

exports.signup = async (req, res) => {
  try {
    console.log(`HTTP POST /user`);

    const { email, password, nickname } = req.body;
    if (!email || !password || !nickname) {
      console.log("one of parameters is not valid.");
      console.log(`${email}, ${password}, ${nickname}`);
      return res.send({
        isSuccess: false,
        code: 400,
      });
    }

    // 체크 email, password, nickname
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // 검증에 사용할 정규식 변수 regExp에 저장
    //출처: https://solbel.tistory.com/375 [개발자의 끄적끄적:티스토리]
    if (!regExp.test(email)) {
      console.log(`password is not valid. ${email}`);
      return res.send({
        isSuccess: false,
        code: 400,
      });
    }

    let regPasswd = /^(?=.*[a-zA-Z])(?=.*[0-9]).{2,25}$/;
    if (!regPasswd.test(password)) {
      return res.send({
        isSuccess: false,
        code: 400,
      });
    }

    if (nickname.length < 2 || nickname.length > 10) {
      return res.send({
        isSuccess: false,
        code: 400,
      });
    }

    // 중복 회원 검사
    const isDuplicatedEmail = userDao.selectUserByEmail(email);
    if (isDuplicatedEmail.length > 0) {
      return res.send({
        isSuccess: false,
        code: 400,
        message: "duplciated email",
      });
    }

    // DB입력
    const insertUserRow = userDao.insertUser(email, password, nickname);
    if (!insertUserRow) {
      return res.send({
        isSuccess: false,
        code: 400,
      });
    }
    res.send({
      isSuccess: true,
      code: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.signin = async (req, res) => {
  try {
    console.log(`HTTP POST /sign-in`);

    const { email, password } = req.body;
    if (!email || !password) {
      console.log("one of parameters is not valid.");
      console.log(`${email}, ${password}`);
      return res.send({
        isSuccess: false,
        code: 400,
      });
    }

    // DB입력
    const isValidUser = await userDao.selectUser(email, password);
    console.log("isValidUser=", isValidUser);
    if (!isValidUser) {
      return res.send({
        isSuccess: false,
        code: 400,
      });
    }
    if (isValidUser.length < 1) {
      return res.send({
        isSuccess: false,
        code: 401,
      });
    }

    // res.send(isValidUser);
    // jwt token
    // 비구조 할당
    const [userInfo] = isValidUser;
    // console.log(userInfo);
    const userIdx = userInfo.userIdx;
    console.log(`jwtSecret=`, jwtSecret);
    const token = jwt.sign({ userIdx: userIdx }, jwtSecret);

    return res.send({
      isSuccess: true,
      result: { token: token },
      code: 200,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      isSuccess: false,
      code: 401,
      message: `${err}`,
    });
  }
};
