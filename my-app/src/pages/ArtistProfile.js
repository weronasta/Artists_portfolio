import React from "react";
import { Box, Avatar, Typography, Button, Container } from "@mui/material";
import ImageGallery from "../components/ImageGallery"; // Import galerii
import ArtistDetails from "../components/ArtistDetails"; // Import danych artysty

function ArtistProfile() {
  return (
    <Container>
    <Box>
     <ArtistDetails />
    {/* Galeria zdjęć */}
    <Box sx={{ px: 3, py: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Galeria prac
      </Typography>
    </Box>
    <ImageGallery />
  </Box>
  </Container>
  );
}

export default ArtistProfile;