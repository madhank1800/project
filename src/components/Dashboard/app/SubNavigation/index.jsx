import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

import logo from "../../../../assests/images/eyp03.png";

import {
  SettingOutlined,
  DiffOutlined,
  DashboardOutlined,
  TeamOutlined,
  QuestionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./subnavigation.css";
import { useSelector } from "react-redux";
const { Sider } = Layout;

export default function Navigation() {
  const [collapsed, setCollapsed] = useState(false);
  const role = localStorage.getItem("role");

  // console.log(role.toLowerCase());

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="navigation"
      >
        <div className="logo">
          <img
            src={logo}
            alt="Logo"
            style={{ margin: "0 auto 40px", display: "block", width: "50px" }}
          />
        </div>
        <Menu mode="inline">
          <Menu.Item key={"Dashboard"} icon={<DashboardOutlined />}>
            <Link to={"/dashboard/profile"} />
            Dashboard
          </Menu.Item>
          {role.toLowerCase() === "admin" ? (
            <>
              <Menu.Item key={"dashboard/Employee"} icon={<TeamOutlined />}>
                <Link to={"/dashboard/employee"} />
                Employees
              </Menu.Item>
              <Menu.Item key={"dashboard/Documets"} icon={<DiffOutlined />}>
                <Link to={"/dashboard/documents"} />
                Upload Documets
              </Menu.Item>
              <Menu.Item key={"dashboard/Enquiry"} icon={<QuestionOutlined />}>
                <Link to={"/dashboard/enquiry"} />
                Enquiry
              </Menu.Item>
              
            </>
          ) : (
            <></>
          )}
          <Menu.Item key={"dashboard/viewdocuments"} icon={<DiffOutlined />}>
            <Link to={"/dashboard/viewdocuments"} />
            My Documets
          </Menu.Item>
          <Menu.Item key={"settings"} icon={<SettingOutlined />}>
            <Link to={"/dashboard/settings"} />
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
