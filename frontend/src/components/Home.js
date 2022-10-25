import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import TodoBlank from "./TodoBlank";
import Todos from "./Todos";

const Home = () => {
  const [loginData, setLoginData] = useState();

  useEffect(() => {
    setLoginData(localStorage.getItem("email") || "");
  }, [loginData]);

  return (
    <div>
      <NavBar />
      {loginData ? (
        <>
          <Todos />
        </>
      ) : (
        <>
          <TodoBlank />
        </>
      )}
    </div>
  );
};

export default Home;
