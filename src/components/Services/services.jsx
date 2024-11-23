import React ,{useState} from "react";
import "./styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

const Services = (props) => {
  const [showFullText, setShowFullText] = useState(Array(props.data?.length).fill(false));
  const toggleFullText = (index) => {
    const newShowFullText = [...showFullText];
    newShowFullText[index] = !newShowFullText[index];
    setShowFullText(newShowFullText);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2 style={{ color: "#333" }}>Our Services</h2>
        </div>
        <div className="row" >
          {props.data ? (
            <Slider {...settings} style={{paddingBottom:"12px"}}>
              {" "}
              {props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <Card className="Card">
                    {" "}
                    <CardContent>
                      <i className={d.icon}></i>
                      <div className="service-desc">
                        <h3 style={{ color: "#333" }}>{d.name}</h3>
                        <p style={{ textAlign: "justify", color: "#333" }}>
                          {" "}
                          {showFullText[i]
                            ? d.text
                            : `${d.text.substring(0, 100)}...`}
                        </p>
                        {d.text.length > 100 && (
                          <Button
                            className="read-more-btn"
                            onClick={() => toggleFullText(i)}
                            size="medium"
                            variant="outlined"
                          >
                            {showFullText[i] ? "Read Less" : "Read More"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>
          ) : (
            "loading"
          )}
        </div>
      </div>
    </div>
  );
};
export default Services;
