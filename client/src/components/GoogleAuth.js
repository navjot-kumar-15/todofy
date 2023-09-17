import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            var token = credentialResponse.credential;
            var decoded = jwt_decode(token);
            if (decoded.email_verified === true) {
              localStorage.setItem("user", JSON.stringify(decoded));
              navigate("/");
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </>
  );
};

export default GoogleAuth;
