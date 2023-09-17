import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);
const id = process.env.CLIENT_ID;
console.log(id);
root.render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="341875603518-2ertsltdknube5p89jcrhokdhov5pbq2.apps.googleusercontent.com"> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);
