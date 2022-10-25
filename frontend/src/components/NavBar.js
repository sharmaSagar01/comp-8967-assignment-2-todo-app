import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";
import KeyIcon from "@mui/icons-material/Key";
import Login from "./Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";
import Home from "./Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
const NavBar = () => {
  let navigate = useNavigate();
  const [loginData, setLoginData] = useState("");
  useEffect(() => {
    setLoginData(localStorage.getItem("name") || "");
  }, [loginData]);

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("bio");
    localStorage.removeItem("phone");
    localStorage.removeItem("photo");

    window.location.reload(false);
  };

  const sendToProfile = (e) => navigate("/profile");

  return (
    <div className="header">
      <img className="header__logo" src="header-logo.png" alt="" />
      <div className="header__appNameSection">
        <p className="header__name">TO-DO LIST APP</p>

        {/* <ListAltIcon className="header__keyIcon" /> */}
      </div>
      <div className="header__options">
        <div className="header__option">
          {loginData ? (
            <AccountCircleIcon onClick={sendToProfile} />
          ) : (
            <AccountCircleIcon />
          )}

          {loginData ? (
            <span className="header__option__userName"> {loginData} </span>
          ) : (
            <span className="header__option__userName"> Guest </span>
          )}
        </div>
        <div className="header__option">
          {loginData ? (
            <Link to="/" className="header__link" onClick={handleLogout}>
              <Button
                variant="contained"
                className="button_logout"
                type="submit"
              >
                Log out
              </Button>
            </Link>
          ) : (
            <Link to="/login" className="header__link">
              <Button variant="contained">Log in</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
