import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState();

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    console.log(process.env.REACT_APP_API_URL);
    try {
      console.log("sending request");
      let resp = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      });
      let data = await resp.json();

      if (!data.user) {
        setErr("User not Found");
        alert("Invalid User Email or Password");
      } else {
        // let data = await resp.json();
        setErr("is logged in");
        localStorage.setItem("name", `${data.name}`);
        localStorage.setItem("email", `${data.email}`);

        // localStorage.setItem("bio", `${data.bio}`);
        // localStorage.setItem("phone", `${data.phone}`);
        // localStorage.setItem("photo", `${data.photo}`);
        alert("User Logged In Successfully!");
        return navigate("/");
      }
    } catch (e) {
      setErr(e.message);
      // alert("User not Found");
    }
  };

  const handleOauth = async (res) => {
    //Handles the Oauth
    const result = res?.profileObj;
    const token = res?.tokenId;
  };
  const handleOauthFailure = (error) => {
    console.log(error);
    console.log("Google Sign in was unsuccessfull. Try again Later");
  };

  return (
    <div className="app__login">
      <Link to="/">
        <img className="login__logo" src="header-logo.png" alt="logo" />
      </Link>
      <div className="login__container">
        <div className="login__container__email">
          <h1>Login</h1>
          {/* <p className="error_message">{err}</p> */}
          <form onSubmit={handleLogin} action="#">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="login__button" variant="contained">
              Sign In
            </Button>
          </form>
          <p>
            Trouble Signing In ? <a href="/register">Forgot Password</a> ?
          </p>
          <span>Or</span>
          <p>
            New User ? <a href="/register">Create a Account</a>{" "}
          </p>
        </div>
        <div className="login__container__oAuth">
          <div className="login__container__divider">
            <div className="vl"></div>
            <h5> Or </h5>
            <div className="vl"></div>
          </div>
          <div className="login__google">
            <GoogleLogin
              buttonText="Sign In with Google"
              onSuccess={handleOauth}
              onFailure={handleOauthFailure}
              cookiePolicy={"single_host_origin"}
            >
              {/* <Button
                type="submit"
                onClick={handleOauth}
                className="login__button__google"
                variant="outlined"
              >
                <img
                  className="google_icon"
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
                  alt=""
                /> */}
              {/* Sign In with Google
              </Button> */}
            </GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
