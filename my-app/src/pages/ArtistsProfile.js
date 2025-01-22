import React from "react";
import { Box, Avatar, Typography, Button, Grid, ImageList, ImageListItem } from "@mui/material";

function ArtistsProfile() {
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
    <Box>
      {/* Nagłówek z coverem */}
      <Box
        sx={{
          width: "100%",
          height: "250px",
          backgroundImage: "url('https://via.placeholder.com/1500x500')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Avatar"
          sx={{
            width: 100,
            height: 100,
            position: "absolute",
            bottom: 0,
            left: 20,
            border: "3px solid white",
          }}
        />
      </Box>

      {/* Nazwa konta i liczniki */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Artysta 1
        </Typography>
        <Box sx={{ display: "flex", gap: 5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              10
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Dodane prace
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              50
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Obserwujący
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Opis profilu */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          To jest miejsce na opis profilu. Możesz tutaj dodać informacje o sobie, swojej twórczości lub inne dane.
        </Typography>
      </Box>

      {/* Przyciski */}
      <Box sx={{ px: 3, py: 2, display: "flex", gap: 2 }}>
        <Button variant="outlined" color="secondary">
          Udostępnij profil
        </Button>
      </Box>

      {/* Galeria zdjęć */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Galeria prac
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
    </Box>
  );
}

export default ArtistsProfile;
