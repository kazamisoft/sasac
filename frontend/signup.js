console.log(`sign-up`);

// sign-up
axios({
  method: "post",
  url: "http://127.0.0.1:3000/user",
  headers: {},
  data: {
    email: "test@mail.com",
    password: "aaaa",
    nickname: "nick",
  },
})
  .then((res) => {
    console.log(res);
  })
  .catch((res) => {});
