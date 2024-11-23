import React from "react";
import "./styles.css"
export const Overview = (props) => {
  return (
    <div id="overview">
    <div className="container">
      <div className="row">
      <div className="col-xs-12 col-md-6">
          <div className="about-text">
            <h2>Who we are</h2>
            <p>{props.data ? props.data.paragraph : "loading..."}</p>
          </div>
        </div>
        <div className="col-xs-12 col-md-6 image-container con">
          {" "}
          <img src="img/overview.jpg" className=" img-responsive img-responsive1" alt="" height={"40vh"} />{" "}
        </div>
     
      </div>
    </div>
  </div>
  );
};
