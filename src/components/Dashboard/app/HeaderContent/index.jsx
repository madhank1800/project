import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Menu, Dropdown } from "antd";
import "./headercontent.css";
import { Avatar as AvatarIcon } from "@mui/material";
import {
  AppstoreOutlined,
  MailFilled,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
// import photo from '@/style/images/photo.png';

import { Link, useNavigate } from "react-router-dom";

export default function HeaderContent({ data }) {
  // const s=useParams()
  // console.log(s)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };
  const dispatch = useDispatch();
  const { SubMenu } = Menu;

  const profileDropdown = (
    <div
      className="profileDropdown whiteBox shadow"
      style={{ minWidth: "200px" }}
    >
      <div className="pad15">
        <AvatarIcon
          size="large"
          className="last"
          style={{
            float: "left",
            background:
              "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
          }}
        >
          {data?.user?.firstname.charAt(0).toUpperCase()}
          {data?.user?.lastname.charAt(0).toUpperCase()}
        </AvatarIcon>
        <div className="info">
          <p className="strong">
            {data?.user?.firstname}-{data?.user?.lastname}
          </p>
          <p>
             {data?.user?.email}
          </p>
        </div>
      </div>
      <div className="line"></div>
      <div></div>
      <div className="line"></div>
      <div>
        <Menu>
          <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
            logout
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <div
      className="headerIcon"
      style={{
        position: "absolute",
        right: 0,
        zIndex: "99",
        cursor: "pointer",
      }}
    >
      <Dropdown
        overlay={profileDropdown}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Avatar
          className="last"
          icon={<PersonRoundedIcon style={{ color: "#fffff" }} />}
        />
      </Dropdown>
      {/* <Avatar icon={<AppstoreOutlined />} /> */}
      <Avatar icon={<BellOutlined />} />
    </div>
  );
}
