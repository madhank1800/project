import React from "react";
import { Navigation } from "../components/Navbar/navigation";
import { useParams } from "react-router-dom";

import { Container, Typography, Grid, AppBar, Toolbar } from "@mui/material";
import "./styles.css";
import Footer from "../Footer";

const JobDesc = () => {
  const { id } = useParams();

  const jobData = [
    {
      id: "0",
      jobTitle: "Java FullStack Developer",
      lastDate: "27-04-2024",
      resume: "hire@eyp.com",
      address: "Niagara Canada",
      jobDescription:
        "As a Java Full Stack Developer, you will be responsible for developing and maintaining both the front-end and back-end aspects of web applications using Java technologies. Your role will involve collaborating with cross-functional teams to design, implement, and deploy scalable software solutions that meet the needs of our clients and end-users.",
    },
    {
      id: "1",
      jobTitle: "Mern-Stack Developer",
      lastDate: "27-04-2024",
      resume: "hire@eyp.com",
      address: "Niagara ,Canada",
      jobDescription:
        "As a MERN Stack Developer, you will play a key role in designing, developing, and maintaining web applications using the MERN (MongoDB, Express.js, React.js, Node.js) stack. You will work closely with cross-functional teams to create scalable, responsive, and user-friendly solutions that meet the needs of our clients and end-users."

   
    },
    {
      id: "2",
      jobTitle: "AWS Lead",
      lastDate: "27-04-2024",
      resume: "hire@eyp.com",
      address: "Niagara ,Canada",
      jobDescription:
        "Wilmington, DEMonitor EvonSys Engineering Rigor related indicators through Dashboarding apps/report & take corrective actions.Connect with leadership on regular basis & handle escalations. Sometelecommuting permitted w/ min travel to meet clients req’d.",
    },
    {
      id: "2",
      jobTitle: "Project Lead",
      lastDate: "27-04-2024",
      resume: "hire@eyp.com",
      address: "Niagara ,Canada",
      jobDescription:
        "Wilmington, DEMonitor EvonSys Engineering Rigor related indicators through Dashboarding apps/report & take corrective actions.Connect with leadership on regular basis & handle escalations. Sometelecommuting permitted w/ min travel to meet clients req’d.",
    },
  ];

  const job = jobData.find((job) => job.id === id);

  return (
    <>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Navigation />
          </Typography>
        </Toolbar>
      </AppBar>
      {job && (
        <div className="careerBg1">
          <Container
            maxWidth="md"
            spacing={2}
            sx={{ backgroundColor: "#151518" }}
          >
            <Grid container spacing={2} sx={{ paddingBottom: "52px" }}>
              <Grid item xs={12} mt={5}>
                {job ? (
                  <>
                    <Typography
                      variant="h4"
                      align="center"
                      sx={{
                        fontSize: "75px",
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      {job.jobTitle}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      align="center"
                      mt={1}
                      sx={{
                        fontSize: "15px",
                        fontWeight: "300",
                        color: "white",
                      }}
                    >
                      {job.lastDate}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1">Job not found!</Typography>
                )}
                {job && (
                  <>
                    <Grid item xs={12} mt={5}>
                      <Typography
                        sx={{
                          marginTop: "20px",
                          fontSize: "18px",
                          lineHeight: "26px",
                          color: "rgba(255, 255, 255, .8)",
                          marginBottom: "10px",
                          fontFamily: "work Sans ,Sans-serif",
                          fontWeight: "300",
                        }}
                      >
                        Address: {job.address}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          marginTop: "20px",
                          fontSize: "18px",
                          lineHeight: "26px",
                          color: "rgba(255, 255, 255, .8)",
                          marginBottom: "10px",
                          fontFamily: "work Sans ,Sans-serif",
                          fontWeight: "300",
                        }}
                      >
                        {job.jobDescription}
                      </Typography>
                      <Typography
                        sx={{
                          marginTop: "20px",
                          fontSize: "18px",
                          lineHeight: "26px",
                          color: "rgba(255, 255, 255, .8)",
                          marginBottom: "10px",
                          fontFamily: "work Sans ,Sans-serif",
                          fontWeight: "300",
                        }}
                      >
                        {job.jobDescription}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          marginTop: "20px",
                          fontSize: "18px",
                          lineHeight: "26px",
                          color: "rgba(255, 255, 255, .8)",
                          marginBottom: "10px",
                          fontFamily: "work Sans ,Sans-serif",
                          fontWeight: "300",
                        }}
                      >
                        Send Resume to: {job.resume}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default JobDesc;
