import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/Register.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  let navigate = useNavigate();

  const handleRegistration = async (e) => {
    // Handle Registration Part
    e.preventDefault();
    if (password1 !== password2) return setErr("password are not matching");
    try {
      console.log("sending request");
      let resp = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password1,
        }),
      });
      if (resp.status === 200) {
        alert("User Registered Successfull");
        return navigate("/login");
      } else if (resp.status === 409) {
        alert("User Already Exists");
      } else {
        alert("User Registration Unsuccessfull");
      }
      console.log(resp, resp.status);
      return setErr(`invalid request ${resp}`);
    } catch (e) {
      console.log(err);
      alert(`error: ${e.message}`);
      setErr(`error: ${e.message}`);
    }
  };
  return (
    <div className="app__register">
      <Link to="/">
        <img className="register__logo" src="header-logo.png" alt="logo" />
      </Link>
      <div className="register__container">
        <div className="register__container__form">
          <h1>REGISTER</h1>

          <form onSubmit={handleRegistration} action="#">
            <label for="fullname">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label for="password1">Password</label>
            <input
              id="password"
              minLength={8}
              type="password"
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
            <label for="password2">Confirm Password</label>
            <input
              id="password2"
              type="password"
              minLength={8}
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <Button type="submit" className="login__button" variant="contained">
              Register
            </Button>
          </form>
          <p>
            Already a User ? <a href="/login">Sign In</a>{" "}
          </p>
        </div>
        <div className="register__container__logo">
          <img className="logo" src="header-logo.png" alt="logo" />
          <div className="register__container__welcome">
            <p> Welcome </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
