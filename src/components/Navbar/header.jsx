import React from "react";
import "./styles.css";
import { Grid, Typography } from "@mui/material";

export const Header = (props) => {
  return (
    <>
      <Grid container padding={4} className="intro">
        <Grid item md={6} xs={12}>
          <h1 className="headerTitle">
            <span className="text-span">Accelerate </span>
            {props.data?.title}
          </h1>
          <a
            href="#"
            className="btn btn-custom  page-scroll btnres"
            style={{ display: "flex", width: " 200px" }}
          >
            Learn More
          </a>{" "}
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="image-container">
            <img
              src="img/home.png"
              className="i img-responsive img-responsive1"
              alt=""
              height={"40vh"}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
