import React from "react";
import { Container, Box, Typography } from "@mui/material";
import ArtistsSlider from "../components/ArtistsSlider"; // Import slidera
import ImageGallery from "../components/ImageGallery";

function Home() {
  return (
    <Container>
      {/* Sekcja Nasi Artyści */}
      <Box mb={4} mt={4}>
        <ArtistsSlider />
      </Box>

      {/* Sekcja Najnowsze Prace */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Najnowsze Prace
        </Typography>
        <ImageGallery />
      </Box>
    </Container>
  );
}

export default Home;
