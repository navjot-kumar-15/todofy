import React from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import { Navigate } from "react-router-dom";

const Home = () => {
  const existingUser = localStorage.getItem("user");
  return (
    <>
      {existingUser ? (
        <>
          <Navbar>
            <Input />
          </Navbar>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Home;
