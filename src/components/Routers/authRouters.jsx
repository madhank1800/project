import React,{lazy} from "react";
import {  Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute/privateRoute";
// import Employees from "../Employees";
const Employees = lazy(() => import('../Employees'));
const Documents = lazy(() => import('../Documents'));
const Enquiry = lazy(() => import('../Enquiry'));
const Viewdocs = lazy(() => import('../Documents/Viewdocuments'));
const EditEmployee = lazy(() => import('../Employees/editEmployee'));
const Profile = lazy(() => import('../Dashboard/profile'));
const Settings = lazy(() => import('../Settings'));

const AuthRouters = () => {
  return (
    <>
      <Routes>
        <Route
          path="employee"
          exact
          element={<PrivateRoute element={<Employees />} />}
        />
        <Route
          path="editemployee"
          exact
          element={<PrivateRoute element={<EditEmployee />} />}
        />
        <Route
          path="documents"
          exact
          element={<PrivateRoute element={<Documents />} />}
        />
        <Route
          path="enquiry"
          exact
          element={<PrivateRoute element={<Enquiry />} />}
        />
        <Route
          path="viewdocuments"
          exact
          element={<PrivateRoute element={<Viewdocs />} />}
        />
        <Route
          path="profile"
          exact
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path="settings"
          exact
          element={<PrivateRoute element={<Settings />} />}
        />
        {/* <Redirect from="/" to="/dashboard/profile"/> */}
      </Routes>
    </>
  );
};

export default AuthRouters;
