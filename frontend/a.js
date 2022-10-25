fetch("https://internship-project-auth.herokuapp.com/RegisterUser", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "name.value",
    password: "password.value",
    email: "email.value",
  }),
  call
}).then((resp) => console.log(resp));
