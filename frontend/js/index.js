console.log("index.js stared");

setHeader();

async function setHeader() {
  console.log("setHeader called");
  const token = localStorage.getItem("x-access-token");
  if (!token) {
    const signed = document.querySelector(".signed");
    signed.classList.add("hidden");
  }
  else {
    const unsigned = document.querySelector(".unsigned");
    unsigned.classList.add("hidden");
  }

  //
  const config = {
    method: "get",
    url: url + "/jwt",
    headers: {
      "x-access-token": token,
    },
  };

  const resp = await axios(config);
  console.log(resp);
  if (resp.data.code !== 200) {
    console.log("Invalid token");
    return;
  }

  const nickname = resp.data.result.nickname;
  console.log(nickname);
  const spanNickname = document.querySelector(".nickname");
  spanNickname.innerText = nickname;
}

// 로그아웃
// const btnSignout = document.getElementByClass("sign-out");
const btnSignout = document.querySelector(".sign-out");
btnSignout.addEventListener("click", () => {
  localStorage.removeItem("x-access-token");
  location.reload();
})
