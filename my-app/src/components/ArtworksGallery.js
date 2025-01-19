import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, ImageList, Button } from "@mui/material";

function ArtworksGallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/artworks");
        setArtworks(response.data);  // Załaduj obrazy z odpowiedzi API
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
        {artworks.map((artwork) => {
          // Tworzymy ścieżkę do obrazu na podstawie odpowiedzi API
          const imageUrl = require(`../assets/images/${artwork.imageLink}`);

          return (
            <Box
              key={artwork.id}
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
              {/* Używamy lokalnej ścieżki do obrazu */}
              <img
                src={imageUrl}  // Załadowany obraz lokalny
                alt={artwork.name}
                // loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transition: "all 0.3s ease-in-out",
                }}
              />

              {/* Warstwa z przyciskiem */}
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
                  opacity: 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert(`Dodano ${artwork.name} do koszyka!`)}
                >
                  Dodaj do koszyka
                </Button>
              </Box>
            </Box>
          );
        })}
      </ImageList>
    </Box>
  );
}

export default ArtworksGallery;
