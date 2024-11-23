import React from "react";
import { useState, useEffect } from "react";
import { Navigation } from "../components/Navbar/navigation";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Slide,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined";
import "./styles.css";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";

import Footer from "../Footer";
import { Margin } from "@mui/icons-material";
const Careers = () => {
  const [showCards, setShowCards] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const dataArray = [
    {
      key1: "Java FullStack Developer",
      key2: "Location:wilimngton",
      key3: "Years of experience: 5 years Full_Time",
      key4: "February 27, 2024",
      key5: "view job description",
      key6: "apply for job",
    },
    {
      key1: "MERN Stack Developer",
      key2: "Location : Irving, Texas, United States",
      key3: "Years of experience :5 Year FULL_TIME",
      key4: "feb27,2024",
      key5: "view job description",
      key6: "apply for job",
    },
    {
      key1: "AWS Lead",
      key2: "Location :Sydney, New South Wales, Australia",
      key3: "Years of experience :5 Year FULL_TIME",
      key4: "September 13, 2023",
      key5: "view job description",
      key6: "apply for job",
    },
    {
      key1: "Project Lead",
      key2: "Location :Sydney, New South Wales, Australia",
      key3: "Years of experience :5 Year FULL_TIME",
      key4: "September 13, 2023",
      key5: "view job description",
      key6: "apply for job",
    },
  ];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = dataArray.slice(startIndex, startIndex + itemsPerPage);
  const onPageChange = (event, page) => {
    // console.log("page-->", page);
    setCurrentPage(page);
  };
  const cardData = [
    {
      title: "Learning & development",

      content:
        "Unleash your maximum potential as EvonSys offers a holistic environment for growth and development.",
      icon: <ApiOutlinedIcon sx={{ fontSize: "40px", color: "white" }} />,
    },
    {
      title: "Health & Wellness",

      content:
        "Eyp secures you and your loved ones with necessary health and wellness benefits. We know you. We care too ‍",
      icon: (
        <HealthAndSafetyOutlinedIcon
          sx={{ fontSize: "40px", color: "white" }}
        />
      ),
    },
    {
      title: "Work-life balance",
      content:
        "At Eyp, we believe that an optimal work-life balance is necessary for well-rounded development ",

      icon: <BalanceOutlinedIcon sx={{ fontSize: "40px", color: "white" }} />,
    },
  ];

  return (
    <>
      {/* <Navigation /> */}

      <div className="careerBg">
        <Grid container spacing={2}  sx={{ backgroundColor: "#151518" }}>
          {/* Heading Row */}
          <Grid item xs={12} mt={10}>
            <Typography
              variant="h4"
              align="center"
              mb={2}
              sx={{
                color: "white",
                fontFamily: "Arial",
                fontWeight: "bold",
                fontSize: "50px",
              }}
            >
              Current openings
            </Typography>
          </Grid>
          {/* Cards Row */}
          <Grid item xs={12}>
            <Grid container justifyContent="space-around" spacing={3}>
              {cardData.map((item, index) => (
                <Slide
                  direction="right"
                  in={showCards}
                  timeout={500}
                  key={index}
                >
                  <Grid key={index} item xs={12} sm={4} md={4}>
                    <Card sx={{ height: "100%", backgroundColor: "#5ca9fb" }}>
                      <CardContent>
                        {/* Content Rows inside Card */}
                        <Box display="flex" alignItems="center" mb={3}>
                          <Box mr={1}>{item.icon}</Box>
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            mb={2}
                            sx={{
                              fontSize: "17px",
                              fontWeight: "bold",
                              color: "white",
                              fontFamily: "Metric ,sans-serif",
                              lineHeight: "20px",
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            color: "rgba(255, 255, 255, .8)",
                            fontFamily: "Work Sans, sans-serif",
                            fontWeight: "300",
                          }}
                        >
                          {item.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Slide>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={10}
        >
          {/* Each Grid item */}
          <Grid item>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontFamily: "Arial",
                fontWeight: "bold",
                fontSize: "50px",
              }}
              className="txt"
            >
              It’s The Right Time to Join
              <br />
              The Eyp Family
            </Typography>
          </Grid>

          {/* Add more Grid items here if needed */}

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            mt={6}
            mb={5}
          >
            {paginatedData.map((item, index) => (
              <>
                <Grid
                  key={index}
                  item
                  xs={8}
                  sx={{
                    borderBottom: "1px solid 	rgb(92, 169, 251)",
                    paddingBottom: "8px",
                  }}
                >
                  {/* Grid container for 3 rows */}
                  <Grid container direction="column" spacing={2}>
                    {/* First Row */}
                    <Grid item md={12} xs={12}>
                      <Typography
                        sx={{
                          fontSize: "25px",
                          color: "white",
                          fontWeight: "700",
                        }}
                        variant="h4"
                      >
                        {item.key1}
                      </Typography>
                    </Grid>
                    {/* Second Row */}
                    <Grid item container spacing={2}>
                      {/* First Column */}
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "200",
                          }}
                        >
                          {item.key2}
                        </Typography>
                      </Grid>
                      {/* Second Column */}
                      <Grid item xs={6}>
                        <Typography
                          align="right"
                          sx={{
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "200",
                          }}
                        >
                          {item.key3}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* Third Row */}
                    <Grid item container spacing={2}>
                      {/* First Column */}
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "15px",
                            fontWeight: "400",
                          }}
                        >
                          {item.key4}
                        </Typography>
                      </Grid>
                      {/* Second Column */}
                      <Grid item xs={12} md={6}>
                        {/* Two buttons */}
                        <Grid container justifyContent="flex-end">
                          <Grid item mr={5} xs={4} md={5}>
                            <Link
                              to={`/job/${index}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{ color: "white", fontSize: "10px" }}
                              >
                                {item.key5}
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item mb={2}  xs={4} md={4}>
                            <Link
                              to={`/job/${index}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button
                                variant="contained"
                                color="secondary"
                                sx={{ color: "white", fontSize: "10px" }}
                              >
                                {item.key6}
                              </Button>
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ))}
          </Grid>
          <Pagination
            style={{ background: "#ffff" ,marginBottom:"20px",borderRadius:"5px"}}
            count={dataArray.length}
            page={currentPage}
            onChange={onPageChange}
          />
        </Grid>
      </div>

      <Footer />
    </>
  );
};
export default Careers;
