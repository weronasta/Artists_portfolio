import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate(); // Nawigacja do profilu artysty

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        p: 2,
        cursor: "pointer", // Kursor wskazujący, że można kliknąć
      }}
      onClick={() => navigate(`/artists/${artist.id}`)} // Kliknięcie przenosi do profilu
    >
      {/* Avatar artysty */}
      <Avatar
        src={artist.avatar}
        alt={artist.name}
        sx={{
          width: { xs: 60, sm: 100, md: 140, lg: 180 }, // Zmienny rozmiar w zależności od ekranu
          height: { xs: 60, sm: 100, md: 140, lg: 180 },
          margin: "0 auto",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)", // Tylko powiększenie na hover
          },
        }}
      />
      <Typography variant="h6" mt={1}>
        {artist.name}
      </Typography>
    </Box>
  );
};

export default ArtistCard;