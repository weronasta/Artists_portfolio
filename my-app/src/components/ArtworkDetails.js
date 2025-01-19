import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";


function ArtworkDetails() {
const [artwork, setArtwork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/artworks/4");
        setArtwork(response.data);  // Załaduj dzieło sztuki z odpowiedzi API
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const imageUrl = require(`../assets/images/${artwork.imageLink}`);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      maxWidth="1200px"
      mx="auto"
      padding={4}
      bgcolor="background.default"
    >
      {/* Główna sekcja */}
      <Box
        display="flex"
        flexDirection={["column", "row"]}
        width="100%"
        gap={4}
        mb={4}
      >
        {/* Sekcja z obrazkiem */}
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={imageUrl}
            alt={artwork.name}
            style={{ width: "100%", height: "auto" }}
          />
        </Paper>

        {/* Sekcja z opisem */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          padding={2}
          bgcolor="background.paper"
          boxShadow={3}
        >
          <Box mb={2}>
            <Typography variant="h4" gutterBottom>
              {artwork.name}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="body1" color="text.secondary">
              {artwork.description}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1" fontWeight="bold" color="text.primary">
              Dostępność: {artwork.availabilityType}
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography variant="h6" color="text.primary">
              Cena: {artwork.currentPrice} zł
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            mb={3}
            gap={2}
          >
            <Typography variant="body1" fontWeight="bold">
              Ilość:
            </Typography>
            <IconButton
              color="primary"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1">{quantity}</Typography>
            <IconButton color="primary" onClick={handleIncrease}>
              <AddIcon />
            </IconButton>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => alert(`Dodano ${quantity} sztuk do koszyka!`)}
            >
              Dodaj do koszyka
            </Button>
          </Box>
        </Box>
    </Box>
    </Box>
  )}
  ;

export default ArtworkDetails;
