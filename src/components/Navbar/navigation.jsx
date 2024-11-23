import React, { useState, useRef } from "react";
import logo from "../../assests/images/eyp03.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
//import { Popover } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
//import  { Typography} from "@mui/material";
import JsonData from "../../data/data.json";
// import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { Dropdown, Space } from "antd";
import "./styles.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
const useStyles = makeStyles((theme) => ({
  menuStyle: {
    // backgroundColor: 'blue',
    // color: 'white',
    // padding: theme.spacing(1, 2),
    // borderRadius: theme.spacing(0.5),
    // '&:hover': {
    //   backgroundColor: 'darkblue',
    // },
  },
  btn: {
    fontFamily: "synthese, sans-serif !important",
    color: "white !important",
    textTransform: "lowercase !important",
    fontSize: "15px !important",
    fontWeight: " 400 !important",
    padding: "8px 2px !important",
    letterSpacing: ".11px !important",
    transition: "transform ease-in-out 1s !important",
    borderRadius: "0 !important",
    margin: " 9px 20px 0 !important",
    bottom: "3px !important",
    "&:hover:after": {
      background:
        "linear-gradient(to right, #6372ff 0%, #5ca9fb 100%) !important",
    },
  },
  listText: {
    "& [class*='-MuiTypography-root']": {
      fontFamily: "synthese, sans-serif ",
      color: "#ffff !important",
      fontSize: "15px",
      fontWeight: 400,
      padding: "8px 2px",
      letterSpacing: "0.11px",
      transition: "transform ease-in-out 1s",
      borderRadius: "0",
      // margin: "9px 20px 0",
      position: "relative",
    },
  },

  navitem: {
    fontFamily: "synthese, sans-serif ",
    color: "#ffff !important",
    fontSize: "15px",
    fontWeight: 400,
    padding: "8px 2px",
    letterSpacing: "0.11px",
    transition: "transform ease-in-out 1s",
    borderRadius: "0",
    margin: "9px 20px 0",
    position: "relative", // Add this to enable the :after pseudo-element to be positioned relative to the nav item
    "&:after": {
      display: "block",
      position: "absolute",
      left: 0,
      bottom: "-1px",
      width: 0,
      height: "2px",
      background:
        "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
      content: '""', // Proper syntax for the content property
      transition: "width 0.2s",
    },
    "&:hover:after": {
      width: "100% !important",
    },
    "&:hover": {
      color: "white !important",
    },
  },
 
  // drawerBg: {
  //   "& .MuiPaper-root": {
  //     backgroundColor: "#36312d", // Replace with your desired background color
  //   },
  // },
  drawerBg1: {
    backgroundColor: "#36312d !important",
    
  },
}));
const technologyServicesArr = [
  "Testing Services",
  "Data Engineering Services",
  "Fullstack",
  "Machine Learning Services",
  "IT Staffing",
  "Artificial Intelligence Services",
  "Power BI Services",
];
const engineeringServicesArr = [
  "Digital Product Engineering",
  "Web Design and Development",
  "Business Intelligence",
  "Machine Learning Services",
  "Mobile App Development",
  "Artificial Intelligence Services",
  "Cloud Computing",
  "Product Design",
  "Enterprise Software Development",
  "DevOps",
  "Awards and recongnition",
];
const items = [
  {
    key: "1",
    type: "",
    label: "Technology Services",
    children: [
      {
        key: "1-1",
        label: "Testing Services",
      },
      {
        key: "1-2",
        label: "Data Engineering Services",
      },
      {
        key: "1-3",
        label: "Fullstack",
      },
      {
        key: "1-4",
        label: "Machine Learning Services",
      },
      {
        key: "1-5",
        label: "IT Staffing",
      },
      {
        key: "1-6",
        label: "Artificial Intelligence Services",
      },
      {
        key: "1-7",
        label: "Power BI Services",
      },
    ],
  },
  {
    key: "2",
    label: "Engineering services",
    children: [
      {
        key: "2-1",
        label: "Digital Product Engineering",
      },
      {
        key: "2-2",
        label: "Web Design and Development",
      },
      {
        key: "2-3",
        label: "Business Intelligence",
      },
      {
        key: "2-4",
        label: "Mobile App Development",
      },
      {
        key: "2-5",
        label: "Cloud Computing",
      },
      {
        key: "2-6",
        label: "Product Design",
      },
      {
        key: "2-7",
        label: "Enterprise Software Development",
      },
      {
        key: "2-8",
        label: "DevOps",
      },
      {
        key: "2-9",
        label: "Awards and recongnition",
      },
    ],
  },
];

export const Navigation = (props) => {
  const classes = useStyles();
  // const data = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  // const token = localStorage.getItem("token");
  const open = Boolean(anchorEl);
  const [open1, setOpen1] = useState(false);
  const anchorRef = useRef(null);
  const [mobileMenu, setMobileMenu] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [techMenuOpen, setTechMenuOpen] = useState(false);
  const [engMenuOpen, setEngMenuOpen] = useState(false);

  // const handleLogout = () => {
  //   localStorage.clear();
  //   navigate("/");
  // };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    console.log(open)
    setDrawerOpen(open);
  };

  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Services", path: "/" },
    { title: "Careers", path: "/careers" },
    { title: "Sign In", path: "/signin" },
  ];

  const handleClick = () => {
    setMobileMenu(!mobileMenu);
  };
  const drawer = (
    <div
      role="presentation"
      onKeyDown={() => toggleDrawer(false)} 
      onClick={() => toggleDrawer(false)} 
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={item.title !== "Services" ? () => toggleDrawer(false) : undefined}
          >
            {item.title !== "Services" ? (
              <Link to={item.path} className={`${classes.navitem}`}>
                {item.title}
              </Link>
            ) : (
              <List>
                <ListItemButton
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleClick();
                  }}
                  className={`${classes.listText}`}
                >
                  <ListItemText primary={item.title} />
                  {mobileMenu ? (
                    <ExpandLess style={{ color: "#fff", fontWeight: 400 }} />
                  ) : (
                    <ExpandMore style={{ color: "#fff", fontWeight: 400 }} />
                  )}
                </ListItemButton>
  
                <Collapse in={mobileMenu} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {/* Technology Services Submenu */}
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => setTechMenuOpen(!techMenuOpen)}
                    >
                      <ListItemText
                        primary="Technology Services"
                        style={{ color: "#fff", fontWeight: 400 }}
                      />
                      {techMenuOpen ? (
                        <ExpandLess style={{ color: "#fff" }} />
                      ) : (
                        <ExpandMore style={{ color: "#fff" }} />
                      )}
                    </ListItemButton>
  
                    <Collapse in={techMenuOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {technologyServicesArr.map((text, idx) => (
                          <ListItemButton sx={{ pl: 8 }} key={idx}>
                            <ListItemText
                              primary={text}
                              style={{ color: "#fff" }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
  
                    {/* Engineering Services Submenu */}
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => setEngMenuOpen(!engMenuOpen)}
                    >
                      <ListItemText
                        primary="Engineering Services"
                        style={{ color: "#fff", fontWeight: 400 }}
                      />
                      {engMenuOpen ? (
                        <ExpandLess style={{ color: "#fff" }} />
                      ) : (
                        <ExpandMore style={{ color: "#fff" }} />
                      )}
                    </ListItemButton>
  
                    <Collapse in={engMenuOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {engineeringServicesArr.map((text, idx) => (
                          <ListItemButton sx={{ pl: 8 }} key={idx}>
                            <ListItemText
                              primary={text}
                              style={{ color: "#fff" }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </List>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
  

  return (
    <>
      <AppBar
        position="static"
        style={{ background: "#36312d" }}
        className="menu"
      >
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <img src={logo} alt="logo" width={70} style={{ margin: "16px" }} />
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon style={{ width: "38px", height: "60px" }} />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                // className={classes.drawerBg}
                classes={{paper:classes.drawerBg1}}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`${classes.navitem} page-scroll`}
              >
                {item.title !== "Services" ? (
                  item.title
                ) : (
                  <Dropdown menu={{ items }}>
                    <a
                      onClick={(e) => e.preventDefault()}
                      style={{ color: "#fff" }}
                    >
                      {item.title}
                    </a>
                  </Dropdown>
                )}
              </Link>
            ))
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
