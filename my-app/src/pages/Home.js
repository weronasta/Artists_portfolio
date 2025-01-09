import React from "react";
import { Avatar, Grid, Typography, Box, Container } from "@mui/material";

function Home() {

  const artists = [
    { id: 1, name: "Artysta 1", avatar: "https://via.placeholder.com/100" },
    { id: 2, name: "Artysta 2", avatar: "https://via.placeholder.com/100" },
    { id: 3, name: "Artysta 3", avatar: "https://via.placeholder.com/100" },
  ];

  const artworks = [
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200",
  ];

  return (
    <Container>
      <Box mb={4}>
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
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Najnowsze Prace
        </Typography>
        <Grid container spacing={2}>
          {artworks.map((artwork, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box
                component="img"
                src={artwork}
                alt={`Artwork ${index + 1}`}
                sx={{ width: "100%", height: "auto", aspectRatio: "1 / 1", objectFit: "cover" }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={4} py={2} sx={{ bgcolor: "primary.main", color: "primary.contrastText", textAlign: "center" }}>
  <Box>
    <Typography variant="body2">Strona Główna | Galeria | O mnie | Kontakt</Typography>
  </Box>
  <Typography variant="body1" gutterBottom>
    &copy; {new Date().getFullYear()}
  </Typography>
</Box>
    </Container>
  );
}

export default Home;