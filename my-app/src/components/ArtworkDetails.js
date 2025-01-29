import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function ArtworkDetails() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart(); // Użycie kontekstu koszyka

  const handleIncrease = () => {
    if (quantity < artwork.numberOf) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (artwork.numberOf <= 0) {
      return;
    }
    addToCart({ ...artwork, quantity }); // Dodanie do koszyka z podaną ilością
    alert(`Dodano do koszyka liczbę sztuk: ${quantity} !`);
  };

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/artworks/${id}`);
        setArtwork(response.data);
        setQuantity(1);
      } catch (error) {
        console.error("Error fetching artwork:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const imageUrl = require(`../assets/images/artworks/${artwork.imageLink}`);

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
      <Box display="flex" flexDirection={["column", "row"]} width="100%" gap={4} mb={4}>
        <Paper
          elevation={3}
          sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <img src={imageUrl} alt={artwork.name} style={{ width: "100%", height: "auto" }} />
        </Paper>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          padding={2}
          bgcolor="background.paper"
          boxShadow={3}
        >
          <Typography variant="h4" gutterBottom>
            {artwork.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {artwork.description}
          </Typography>
          <Typography variant="body1" fontWeight="bold" color="text.primary">
            Dostępność: {artwork.availabilityType}
          </Typography>
          <Typography variant="h6" color="text.primary">
            Cena: {artwork.currentPrice} zł
          </Typography>
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
            <IconButton
              color="primary"
              onClick={handleIncrease}
              disabled={quantity >= artwork.numberOf}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAddToCart}
            disabled={artwork.numberOf <= 0}
          >
            Dodaj do koszyka
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ArtworkDetails;
