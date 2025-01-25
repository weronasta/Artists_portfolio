import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ArtworkCard({ artwork }) {
  const navigate = useNavigate(); // Function for navigation

  const imageUrl = require(`../assets/images/artworks/${artwork.imageLink}`); // Load local image

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        paddingTop: "100%", // Aspect ratio 1:1 for square shape
        "&:hover .overlay": {
          opacity: 1,
        },
        "&:hover img": {
          filter: "blur(4px)",
          transform: "scale(1.1)",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      <img
        src={imageUrl} // Loaded local image
        alt={artwork.name}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Cover behavior to fill the square
          transition: "all 0.3s ease-in-out",
        }}
      />

      {/* Overlay with buttons */}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column", // Stack buttons vertically
          gap: 2, // Space between buttons
          opacity: 0, // Hide overlay
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert(`Dodano obraz do koszyka!`)}
        >
          Dodaj do koszyka
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/artworks/${artwork.id}`)} // Navigate to artwork details
        >
          Zobacz szczegóły
        </Button>
      </Box>
    </Box>
  );
}

export default ArtworkCard;
