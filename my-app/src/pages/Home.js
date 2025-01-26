import React from "react";
import { Container, Box, Typography } from "@mui/material";
import ArtistsSlider from "../components/ArtistsSlider"; // Import slidera
import ArtworksGallery from "../components/ArtworksGallery";

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
        <ArtworksGallery artistId={1}/>
      </Box>
    </Container>
  );
}

export default Home;
