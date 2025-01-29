import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function ArtworkCard({ artwork, cardType }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (artwork.numberOf <= 0) {
      return;
    }
    addToCart({ ...artwork, quantity: 1 }); // Dodanie do koszyka z podaną ilością
    alert(`Dodano do koszyka!`);
  };

  const handleEditWork = () => {
    navigate(`/edit/${artwork.id}`); // Przekierowanie do edytowania pracy
  };

  const imageUrl = require(`../assets/images/artworks/${artwork.imageLink}`);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        paddingTop: "100%",
        marginBottom: "4px", // Dodanie odstępu od dołu
        "&:hover .overlay": { opacity: 1 },
        "&:hover img": {
          filter: "blur(4px)",
          transform: "scale(1.1)",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      <img
        src={imageUrl}
        alt={artwork.name}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "all 0.3s ease-in-out",
        }}
      />
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
          flexDirection: "column",
          gap: 2,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {cardType === "cart" ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={artwork.numberOf <= 0}
            >
              Dodaj do koszyka
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/artworks/${artwork.id}`)}
            >
              Zobacz szczegóły
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditWork}
            >
              Edytuj pracę
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/artworks/${artwork.id}`)}
            >
              Zobacz szczegóły
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ArtworkCard;
