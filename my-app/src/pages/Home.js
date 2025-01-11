import React from "react";
import { Avatar, Grid, Typography, Box, Container } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function Home() {
  const artists = [
    { id: 1, name: "Artysta 1", avatar: "https://via.placeholder.com/100" },
    { id: 2, name: "Artysta 2", avatar: "https://via.placeholder.com/100" },
    { id: 3, name: "Artysta 3", avatar: "https://via.placeholder.com/100" },
  ];

  const itemData = [
    { img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e", title: "Breakfast" },
    { img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d", title: "Burger" },
    { img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45", title: "Camera" },
    { img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c", title: "Coffee" },
    { img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8", title: "Hats" },
    { img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62", title: "Honey" },
    { img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6", title: "Basketball" },
    { img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f", title: "Fern" },
    { img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25", title: "Mushrooms" },
    { img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af", title: "Tomato basil" },
    { img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1", title: "Sea star" },
    { img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6", title: "Bike" },
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
  <ImageList sx={{ width: "100%" }} cols={4}>
    {itemData.map((item) => (
      <ImageListItem key={item.img}>
        <img
          src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
  </ImageList>
</Box>
    </Container>
  );
}

export default Home;
