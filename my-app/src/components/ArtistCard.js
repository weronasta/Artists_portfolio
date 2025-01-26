import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
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
        "&:hover .overlay": {
          opacity: 1,
        },
        "&:hover .avatar": {
          filter: "blur(4px)",
          transform: "scale(1.1)",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      {/* Avatar artysty */}
      <Avatar
        className="avatar"
        src={artist.avatar}
        alt={artist.name}
        sx={{
          width: { xs: 60, sm: 100, md: 140, lg: 180 }, // Zmienny rozmiar w zależności od ekranu
          height: { xs: 60, sm: 100, md: 140, lg: 180 },
          margin: "0 auto",
          transition: "all 0.3s ease-in-out",
        }}
      />
      <Typography variant="h6" mt={1}>
        {artist.name}
      </Typography>

      {/* Overlay z przyciskiem */}
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
          opacity: 0, // Ukrycie overlay
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/artists/${artist.id}`)} // Przejdź do szczegółów artysty
        >
          Zobacz profil
        </Button>
      </Box>
    </Box>
  );
};

export default ArtistCard;
