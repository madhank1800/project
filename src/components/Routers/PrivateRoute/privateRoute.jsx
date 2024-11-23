import React from "react";
import "./privateRoute.css";

import { Navigate } from "react-router-dom";
const privateRoute = ({ element: Element, ...rest }) => {
  let token= localStorage.getItem("token")

  return token ? Element : <Navigate to="/signin" />;
};

export default privateRoute;
