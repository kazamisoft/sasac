console.log('sign-in');

// 토큰검사
const token = localStorage.getItem("x-access-token");
if (token) {
  alert("로그아웃후에 이용해 주세요")
  location.href = "index.html";
}

const regPasswd = /^(?=.*[a-zA-Z])(?=.*[0-9]).{2,25}$/;
const inputEmail = document.getElementById("email");
const emailMessage = document.querySelector("div.email-message");
inputEmail.addEventListener("input", isValidEmail);

const inputPassword = document.getElementById("password");
const passwordMessage = document.querySelector("div.password-message");
inputPassword.addEventListener("input", isValidPassword);

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

  if (!regPasswd.test(currentPassword)) {
    passwordMessage.style.visibility = "visible";
    return false
  }
  else {
    passwordMessage.style.visibility = "hidden";
  }
  return true;
}

// 로그인
const btnSignin = document.getElementById("signin");
btnSignin.addEventListener("click", async function (event) {
  const isValidReq = isValidEmail() && isValidPassword();

  console.log(isValidReq);
  if (!isValidReq) {
    alert("입력값을 확인해 주세요");
    return false;
  }

  const currentEmail = inputEmail.value;
  const currentPassword = inputPassword.value;

  const config = {
    method: "post",
    url: url + "/sign-in",
    data: {
      email: currentEmail,
      password: currentPassword,
    },
  };

  try {
    const res = await axios(config);
    //const token = res.headers["x-access-token"];
    //console.log(res.data.result);
    if (res.data.code != 200) {
      alert(res.data.message);
      return false;
    }
    const { token } = res.data.result;
    console.log(`token=`, token)
    localStorage.setItem("x-access-token", token);
    alert("로그인 성공");
    // 메인페이지로 이동
    location.href = "index.html";
  } 
  catch (err) {
    console.error(err);
  }
});
