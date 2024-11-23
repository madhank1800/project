import React from "react";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import logo from "../assests/images/eyp03.png";

import { Grid, Typography, Box } from "@mui/material";

const Footer = () => {
  const categories = [
    {
      category: "Solutions",
      services: [
        "BANKING",
        "INSURENCE",
        "RETAIL & CONSUMERS",
        "HIGH-TECH &MANUFACTURING",
      ],
    },
    {
      category: "Services",
      services: [
        "DIGITAL SERVICES",
        "MENDIX SERVICES",
        "MICROSOFT CSP",
        "PEGA SERVICES",
        "PRODUCTS",
      ],
    },
    {
      category: "Company",
      services: [
        "HOME",
        "INSIGHTS",
        "CAREERS",
        "TERMS OF SERVICES",
        "PRIVACY POLICY",
      ],
    },
    {
      category: "Resources",
      services: [
        "CASE STUDIES",
        "Eyp is a global leader, certified Pega partner, and the fastest growing next-gen advocate of digital transformation through low code solutions",
      ],
    },
  ];
  return (
    <>
      <Grid
        container
        spacing={2}
        p={5}
        sx={{
          backgroundImage:
            "linear-gradient(to right,rgb(16,137,211) 0% ,rgb(18,177,209) 100%)",
          height: "auto",
        }}
      >
        <Grid container p={2} mb={5}>
          <Grid
            item
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            xs={12}
          >
            <img src={logo} alt="eyp" height="50px" width="55px" />
            <Box display="flex" ml={4} sx={{ cursor: "pointer" }}>
              {/* Icons */}
              <FacebookOutlinedIcon sx={{ fontSize: "40px", color: "white" }} />
              <LinkedInIcon sx={{ fontSize: "40px", color: "white" }} />
              <XIcon sx={{ fontSize: "40px", color: "white" }} />
            </Box>
          </Grid>
          {/* Using Box to display icons in a row */}
        </Grid>
        {categories.map((category, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Typography
              variant="h6"
              mb={3}
              gutterBottom
              sx={{
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "700",
                borderBottom: "1px solid white",
              }}
            >
              {category.category}
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {category.services.map((service, index) => (
                <li key={index}>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "13px",
                      cursor: "pointer",
                      fontWeight: "700",
                      lineHeight: "25px",
                      textTransform:"uppercase"
                    }}
                  >
                    {service}
                  </Typography>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Footer;
