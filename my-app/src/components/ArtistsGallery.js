import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, ImageList } from "@mui/material";
import ArtistCard from "./ArtistCard"; // Importujemy komponent ArtistCard

function ArtistsGallery() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/artists");
        const data = response.data;

        setArtists(
          data.map((artist) => ({
            id: artist.id,
            name: artist.username,
            avatar: require(`../assets/images/artists/${artist.avatarLink}`) || "https://via.placeholder.com/100", // Ścieżka lokalna
          }))
        );
      } catch (error) {
        console.error("Błąd podczas pobierania artystów:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <ImageList variant="masonry" cols={3} gap={4} sx={{ width: "80%" }}>
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} /> // Przekazujemy dane do ArtistCard
        ))}
      </ImageList>
    </Box>
  );
}

export default ArtistsGallery;
