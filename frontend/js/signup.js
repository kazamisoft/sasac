console.log(`sign-up.js`);


// 입력값 유효성 검사
const inputEmail = document.getElementById("email");
const emailMessage = document.querySelector("div.email-message");
inputEmail.addEventListener("input", isValidEmail);

const inputPassword = document.getElementById("password");
const passwordMessage = document.querySelector("div.password-message");
inputPassword.addEventListener("input", isValidPassword);
const confirmMessage = document.querySelector("div.password-confirm-message");
confirmPassword = document.getElementById("password-confirm");
confirmPassword.addEventListener("input", isValidPassword);

// 
function isValidEmail(event) {
  const currentEmail = inputEmail.value;
  // console.log(currentEmail);

  var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  // 검증에 사용할 정규식 변수 emailReg에 저장
  //출처: https://solbel.tistory.com/375 [개발자의 끄적끄적:티스토리]
  if (!emailReg.test(currentEmail)) {
    console.log(`password is not valid. ${currentEmail}`);
    emailMessage.style.visibility = "visible";
    return false;
  }
  else {
    emailMessage.style.visibility = "hidden";
  }
  return true;
}

function isValidPassword() {
  const currentPassword = inputPassword.value;

  let regPasswd = /^(?=.*[a-zA-Z])(?=.*[0-9]).{2,25}$/;
  if (!regPasswd.test(currentPassword)) {
    passwordMessage.style.visibility = "visible";
    return false
  }
  else {
    passwordMessage.style.visibility = "hidden";
  }
  return true;
}

function isValidConfirm() {
  const currentPassword = confirmPassword.value;

  let regPasswd = /^(?=.*[a-zA-Z])(?=.*[0-9]).{2,25}$/;
  if (!regPasswd.test(currentPassword)) {
    confirmMessage.style.visibility = "visible";
    return false
  }
  else {
    confirmMessage.style.visibility = "hidden";
  }
  return true;
}

const inputNickname = document.getElementById("nickname");
function isValidNickname() {
  return true;
}

// 회원가입
const buttonSignup = document.getElementById("signup");
buttonSignup.addEventListener("click", async function (event) {
  const isValidReq =
    isValidEmail() &&
    isValidPassword() &&
    isValidConfirm() &&
    isValidNickname();
  console.log(isValidReq);
  if (!isValidReq) {
    alert("회원 정보를 확인해 주세요");
    return false;
  }

  const currentEmail = inputEmail.value;
  const currentPassword = inputPassword.value;
  const currentNickname = inputNickname.value;

  const config = {
    method: "post",
    url: url + "/user",
    data: {
      email: currentEmail,
      password: currentPassword,
      nickname: currentNickname,
    },
  };

  try {
    const res = await axios(config);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
});

