import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ArtworkCard from "./ArtworkCard";

function OtherArtworksSlider() {
  const { id } = useParams(); // Pobieramy id z URL głównego dzieła
  const [otherArtworks, setOtherArtworks] = useState([]);

  useEffect(() => {
    const fetchOtherArtworks = async () => {
      try {
        // Pobieramy dane o głównym dziele
        const response = await axios.get(`http://127.0.0.1:5000/artworks/${id}`);
        const artistId = response.data.artist_id;

        // Pobieramy inne dzieła tego samego artysty
        const otherArtworksResponse = await axios.get(`http://127.0.0.1:5000/artworks/artist/${artistId}`);
        
        // Filtrujemy dzieła tego artysty, aby nie wyświetlać głównego dzieła (id z useParams)
        const filteredArtworks = otherArtworksResponse.data.filter(artwork => parseInt(artwork.id) !== parseInt(id));
        console.log("filteredArtworks", filteredArtworks);
        console.log("id", id);
        setOtherArtworks(filteredArtworks); // Ustawiamy przefiltrowane dzieła
      } catch (error) {
        console.error("Error fetching other artworks:", error);
      }
    };

    fetchOtherArtworks();
  }, [id]); // Zależność na id z useParams, żeby ponownie pobierać dane, gdy id się zmieni

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0", 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: '100%' }}> {/* Ustawiamy szerokość slidera na 100% */}
      <Typography variant="h5" mb={2}>
        Inne dzieła artysty
      </Typography>
      <Slider {...sliderSettings} style={{ width: '100%' }}> {/* Dodajemy szerokość 100% na slider */}
        {otherArtworks.map((artwork) => (
          <Box key={artwork.id} sx={{ 
            padding: "0 15px",
           }}>
            <ArtworkCard artwork={artwork} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default OtherArtworksSlider;
