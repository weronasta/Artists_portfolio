// ArtworkCard.js
import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; 

function ArtworkCard({ artwork }) {
  const navigate = useNavigate(); // Funkcja do nawigacji

  const imageUrl = require(`../assets/images/${artwork.imageLink}`); // Załaduj obraz

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
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
        src={imageUrl}  // Załadowany obraz lokalny
        alt={artwork.name}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          transition: "all 0.3s ease-in-out",
        }}
      />
      
      {/* Warstwa z przyciskami */}
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
          flexDirection: "column", // Ustaw przyciski w kolumnie
          gap: 2, // Odstęp między przyciskami
          opacity: 0, // Ukryj overlay
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
          onClick={() => navigate(`/artworks/${artwork.id}`)} // Nawigacja do szczegółów obrazu
        >
          Zobacz szczegóły
        </Button>
      </Box>
    </Box>
  );
}

export default ArtworkCard;
