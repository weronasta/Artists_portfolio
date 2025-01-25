import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, ImageList } from "@mui/material";
import ArtworkCard from "./ArtworkCard"; // Importujemy nowy komponent

function ArtworksGallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/artworks");
        setArtworks(response.data);  // Załaduj dzieła sztuki z odpowiedzi API
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
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
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} /> // Przekazujemy dane do ArtworkCard
        ))}
      </ImageList>
    </Box>
  );
}

export default ArtworksGallery;
