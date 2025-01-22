import React from "react";
import { Grid, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

// Styled components
const Tile = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  paddingTop: "100%", // To make the tiles square
  overflow: "hidden",
  backgroundColor: theme.palette.grey[300],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
}));

const TileContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(0px)",
  transition: "filter 0.3s ease",
  '&:hover': {
    filter: "blur(4px)",
  },
}));

const HoverOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  opacity: 0,
  transition: "opacity 0.3s ease",
  '&:hover': {
    opacity: 1,
  },
}));

const ImageGallery = () => {
  const placeholderImages = [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
  ];

  return (
    <Grid container spacing={2}>
      {placeholderImages.map((image, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Tile>
            <TileContent style={{ backgroundImage: `url(${image})` }} />
            <HoverOverlay>
              <Button variant="contained" color="secondary">
                Zobacz szczegóły
              </Button>
            </HoverOverlay>
          </Tile>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageGallery;