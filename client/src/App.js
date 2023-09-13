import React, { useEffect } from "react";

import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { useDispatch } from "react-redux";
import { getAllTodoAsyn } from "./features/todo/todoSlice";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTodoAsyn());
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
