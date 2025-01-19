import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Slider from "react-slick";
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import ArtworkDetails from "../components/ArtworkDetails";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Artwork() {
  const [quantity, setQuantity] = useState(1);


  const sliderImages = [img1, img2, img3];

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      maxWidth="1200px"
      mx="auto"
      padding={4}
      bgcolor="background.default"
    >
      <ArtworkDetails /> 
      {/* Sekcja Slidera */}
      <Box width="100%">
  <Typography variant="h5" gutterBottom>
    Inne prace tego artysty
  </Typography>
  <Slider {...sliderSettings}>
    {sliderImages.map((image, index) => (
      <Box
        key={index}
        px={1}
        sx={{
          position: "relative",
          overflow: "hidden", // Ukryj nadmiar obrazka
          "&:hover .overlay": {
            opacity: 1, // Pokaż overlay na hover
          },
          "&:hover img": {
            transform: "scale(1.1)", // Powiększenie obrazka na hover
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px", // Wysokość kafelka
          }}
        >
          <img
            src={image}
            alt={`Artwork ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Zachowaj proporcje
              transition: "all 0.3s ease-in-out",
            }}
          />
        </Paper>

        {/* Warstwa z przyciskami */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column", // Ustaw przyciski w kolumnie
            gap: 2, // Odstęp między przyciskami
            opacity: 0, // Ukryj overlay
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert(`Dodano obraz ${index + 1} do koszyka!`)}
          >
            Dodaj do koszyka
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => alert(`Otworzono szczegóły obrazu ${index + 1}`)}
          >
            Zobacz szczegóły
          </Button>
        </Box>
      </Box>
    ))}
  </Slider>
</Box>
    </Box>
  );
}

export default Artwork;
