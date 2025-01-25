// ArtistsSlider.js
import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Slider from "react-slick"; // Slider z react-slick
import "slick-carousel/slick/slick.css"; // Styl slidera
import "slick-carousel/slick/slick-theme.css"; // Styl slidera
import axios from "axios";
import ArtistCard from "./ArtistCard"; // Importujemy nasz komponent

const ArtistsSlider = () => {
  const [artists, setArtists] = useState([]); // Stan do przechowywania artystów
  const [loading, setLoading] = useState(true); // Stan ładowania

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/artists");
        const data = response.data;

        setArtists(
          data.map((artist) => ({
            id: artist.id,
            name: artist.username,
            avatar: require(`../assets/images/artists/${artist.avatarLink}`) || "https://via.placeholder.com/100", // Ścieżka lokalna
          }))
        );
      } catch (error) {
        console.error("Błąd podczas pobierania artystów:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Ustawienia slidera
  const sliderSettings = {
    dots: true, // Kropki nawigacyjne
    infinite: true, // Nieskończona pętla
    speed: 500, // Szybkość przejścia
    slidesToShow: 4, // Ilość widocznych slajdów
    slidesToScroll: 1, // Ilość slajdów przewijanych na raz
    responsive: [
      {
        breakpoint: 1024, // Dla ekranów poniżej 1024px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600, // Dla ekranów poniżej 600px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Dla ekranów poniżej 480px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box mb={4}>
      <Typography variant="h4" gutterBottom>
        Nasi Artyści
      </Typography>
      {loading ? (
        <CircularProgress /> // Wyświetlenie loadera podczas ładowania
      ) : (
        <Slider {...sliderSettings}>
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default ArtistsSlider;
