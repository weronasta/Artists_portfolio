import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, ImageList } from "@mui/material";
import ArtworkCard from "./ArtworkCard"; // Importujemy nowy komponent

function ArtworksGallery({artistId}) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        let url = "http://127.0.0.1:5000/artworks"; // Domyślny URL dla wszystkich dzieł
        if (artistId) {
          url = `http://127.0.0.1:5000/artworks/artist/${artistId}`; // Zaktualizowany URL z parametrem artist_id
        }

        const response = await axios.get(url);
        setArtworks(response.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [artistId]); // UseEffect uruchomi się przy zmianie artist_id

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <ImageList variant="masonry" cols={3} gap={4} sx={{ width: "80%" }}>
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} /> // Przekazujemy dane do ArtworkCard
        ))}
      </ImageList>
  );
}

export default ArtworksGallery;
