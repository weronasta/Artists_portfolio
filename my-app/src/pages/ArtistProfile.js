import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ArtistDetails from "../components/ArtistDetails"; // Import danych artysty
import ArtworksGallery from "../components/ArtworksGallery"; // Import galerii prac artysty
import { useParams } from "react-router-dom";

function ArtistProfile() {
  const { id } = useParams(); 
  return (
    <Container>
    <Box>
     <ArtistDetails />
    {/* Galeria zdjęć */}
    <Box sx={{ px: 3, py: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Galeria prac
      </Typography>
      <ArtworksGallery artistId={id} cardType={"cart"} />
    </Box>
  </Box>
  </Container>
  );
}

export default ArtistProfile;