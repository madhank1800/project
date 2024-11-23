import React, { useEffect, lazy } from "react";
import  Services  from "./components/Services/services";
import SmoothScroll from "smooth-scroll";
import "./App.css";
// import { Services } from "./components/services";
import {  Route, Routes,useLocation } from "react-router-dom";
// import SignIn from "./components/SignIn/signin";
// import Home from "./components/Home/home";
import PrivateRoute from "./components/Routers/PrivateRoute/privateRoute";
//import dashboard from "./components/Dashboard/dashboard";
// import Dashboard from "./components/Dashboard/dashboard";
import { login } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { updateUser } from "./reducers/userReducer";
import JobDesc from "./JobDesc";
import { Navigation } from "./components/Navbar/navigation";

//import { AppBar, Toolbar } from "@mui/material";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});
// Lazy load components
const Home = lazy(() => import("./components/Home/home"));
const SignIn = lazy(() => import("./components/SignIn/signin"));
const Dashboard = lazy(() => import("./components/Dashboard/dashboard"));
const Careers = lazy(() => import("./Careers"));
const SignUp = lazy(() => import("./components/signup"));

const App = () => {
  // const [landingPageData, setLandingPageData] = useState({});
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   localStorage.getItem("token")
  // );
  const updateuser=useSelector(state=>state?.auth?.updateUser)
  const dispatch = useDispatch();
  const location = useLocation()
  useEffect(() => {
    // setLandingPageData(JsonData);
    dispatch(
      login({
        user: JSON.parse(localStorage.getItem("user")),
        token: localStorage.getItem("token"),
      })
    );
    // dispatch(
    //   updateUser()
    // );
  });
  const shouldShowNavigation = !location.pathname.startsWith("/dashboard");
  return (
    // <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Content>
        {shouldShowNavigation && <Navigation />}
       
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route
              path="/services"
              exact
              render={(props) => <Services {...props} />}
            />
            <Route
              path="/careers"
              exact
              Component={Careers}    />
               
            <Route path="/signin" exact element={<SignIn />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/job/:id" exact   element={<JobDesc/>} /> 
            <Route
              path="/dashboard/*"
              exact
              element={<PrivateRoute element={<Dashboard />} />}
            >
              {/* <Route
                path="employee"
                exact
                element={<PrivateRoute element={<Employees />} />}
              /> */}

            </Route>
          </Routes>
        </Content>
      </Layout>
    // </Layout>
  );
};

export default App;
