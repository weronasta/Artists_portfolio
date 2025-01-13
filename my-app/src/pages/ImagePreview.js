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

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PreviewImage() {
  const [quantity, setQuantity] = useState(1);

  const imageData = {
    img: img1,
    title: "Sample Artwork",
    description:
      "This is a sample description of the artwork. You can replace this with any text you like.",
    availability: "Dostępne",
    price: "21.37 zł",
  };

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
      {/* Główna sekcja */}
      <Box
        display="flex"
        flexDirection={["column", "row"]}
        width="100%"
        gap={4}
        mb={4}
      >
        {/* Sekcja z obrazkiem */}
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={imageData.img}
            alt={imageData.title}
            style={{ width: "100%", height: "auto" }}
          />
        </Paper>

        {/* Sekcja z opisem */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          padding={2}
          bgcolor="background.paper"
          boxShadow={3}
        >
          <Box mb={2}>
            <Typography variant="h4" gutterBottom>
              {imageData.title}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="body1" color="text.secondary">
              {imageData.description}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1" fontWeight="bold" color="text.primary">
              Dostępność: {imageData.availability}
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography variant="h6" color="text.primary">
              Cena: {imageData.price}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            mb={3}
            gap={2}
          >
            <Typography variant="body1" fontWeight="bold">
              Ilość:
            </Typography>
            <IconButton
              color="primary"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1">{quantity}</Typography>
            <IconButton color="primary" onClick={handleIncrease}>
              <AddIcon />
            </IconButton>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => alert(`Dodano ${quantity} sztuk do koszyka!`)}
            >
              Dodaj do koszyka
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Sekcja Slidera */}
      <Box width="100%">
        <Typography variant="h5" gutterBottom>
          Inne obrazy
        </Typography>
        <Slider {...sliderSettings}>
  {sliderImages.map((image, index) => (
    <Box key={index} px={1}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden", // Dodano, aby ukryć nadmiar obrazka
          height: "300px", // Wysokość kafelka
        }}
      >
        <img
          src={image}
          alt={`Artwork ${index + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Kluczowa zmiana dla zachowania proporcji
          }}
        />
      </Paper>
    </Box>
  ))}
</Slider>

      </Box>
    </Box>
  );
}

export default PreviewImage;
