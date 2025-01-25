import React, { useState, useEffect } from "react";
import { Box, Avatar, Typography, Button, Container } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

function ArtistDetails() {
  const { id } = useParams(); 
  const [artist, setArtist] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/artists/${id}`);
        setArtist(response.data);
        artist.avatarLink = require(`../assets/images/artists/${artist.avatarLink}`);
      } catch (error) {
        console.error("Błąd podczas pobierania artysty", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <Container>
      <Box>
        {/* Nagłówek z coverem */}
        <Box
          sx={{
            width: "100%",
            height: "250px",
            backgroundColor: "#871EEB",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Avatar
            src={require(`../assets/images/artists/${artist.avatarLink}`)}
            alt={artist.username}
            sx={{
              width: 200,
              height: 200,
              position: "absolute",
              bottom: 0,
              left: 20,
              border: "3px solid white",
            }}
          />
        </Box>

        {/* Nazwa konta i liczniki */}
        <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            {artist.username || "Artysta"}
          </Typography>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {artist.artworksCount || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Dodane prace - NICE TO HAVE
              </Typography>
            </Box>
            {/* Przyciski */}
            <Box sx={{ px: 3, py: 2, display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary">
                Zamów dzieło sztuki
            </Button>
            </Box>
          </Box>
        </Box>

        {/* Opis profilu */}
        <Box sx={{ px: 3, py: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {artist.bio ||
              "To jest miejsce na opis profilu. Możesz tutaj dodać informacje o sobie, swojej twórczości lub inne dane."}
          </Typography>
        </Box>

      </Box>
    </Container>
  );
}

export default ArtistDetails;
