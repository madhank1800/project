import React,{useEffect,useState} from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "./app/SubNavigation";
import { Layout } from "antd";
import HeaderContent from "./app/HeaderContent";
import { Content } from "antd/es/layout/layout";
import AuthRouters from "../Routers/authRouters";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

  primary: {
    textAlign: "center",
    fontWeight: " 900 !important",
    fontSize: "15px !important",
    color: "rgb(16, 137, 211)",
  },
  secondary: {
    textAlign: "center",
    fontWeight: " 600 !important",
    fontSize: "10px !important",
    color: "rgb(16, 137, 211)",
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const navigate=useNavigate()
  const currentUser = useSelector((state) => state.auth);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  // const [token, setToken] = useState(localStorage.getItem("token"));
  // console.log(currentUser);
  // const user = currentUser?.user;
useEffect(()=>{
  navigate("/dashboard/profile")
},[])
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Navigation />
        <Layout style={{ minHeight: "100vh" }}>
          <HeaderContent data={currentUser} />
          <Content style={{ marginTop: "100px" }}>
            <AuthRouters />
         {/* <Redirect from="/dashboard" to="/dashboard/profile"/> */}
         
          
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
