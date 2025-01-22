import React from "react";
import { Avatar, Grid, Typography, Box, Container } from "@mui/material";
import ImageGallery from "../components/ImageGallery"; // Import galerii

function Home() {
  const artists = [
    { id: 1, name: "Artysta 1", avatar: "https://via.placeholder.com/100" },
    { id: 2, name: "Artysta 2", avatar: "https://via.placeholder.com/100" },
    { id: 3, name: "Artysta 3", avatar: "https://via.placeholder.com/100" },
  ];

  return (
    <Container>
      {/* Sekcja Nasi Artyści */}
      <Box mb={4} mt={4}>
        <Typography variant="h4" gutterBottom>
          Nasi Artyści
        </Typography>
        <Grid container spacing={2}>
          {artists.map((artist) => (
            <Grid item xs={4} sm={3} md={2} key={artist.id} style={{ textAlign: "center" }}>
              <Avatar src={artist.avatar} alt={artist.name} sx={{ width: 100, height: 100, margin: "0 auto" }} />
              <Typography variant="body1">{artist.name}</Typography>
            </Grid>
          ))}
        </Grid>
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
