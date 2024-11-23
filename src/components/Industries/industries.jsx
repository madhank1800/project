import { Image } from "./image";
import React from "react";
import "./styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
export const Industries = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div id="industries" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Industries We Serve</h2>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p> */}
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data ? (
              <Slider {...settings}>
                {" "}
                {props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                  
                        <Image title={d.title} smallImage={d.smallImage} />{" "}
                  </div>
                ))}
              </Slider>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
