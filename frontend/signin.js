// sign-up
async function login() {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:3000/sign-in",
      headers: {},
      data: {
        email: "test@mail.com",
        password: "aaaa",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(err);
      });
  } catch (err) {
    console.log(`error:`, err);
  }
}
