import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // Użycie kontekstu koszyka
import { Stepper, Step, StepLabel } from "@mui/material";

function ShoppingCart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Sprawdzamy, czy koszyk jest pusty
  const isEmpty = cartItems.length === 0;

  // Ustalamy kroki Steppera
  const steps = ["Koszyk", "Dostawa", "Podsumowanie"];

  // Obliczamy sumę cen w koszyku
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.currentPrice * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        padding: 4,
        bgcolor: "background.default",
      }}
    >
      {/* Stepper */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Typography variant="h4" gutterBottom>
        Koszyk
      </Typography>

      {/* Cała sekcja koszyka w Box o szerokości 80% */}
      <Box sx={{ width: "80%", mb: 4 }}>
        {isEmpty ? (
          // Wyświetlanie komunikatu i przycisku, jeśli koszyk jest pusty
          <Box sx={{ textAlign: "center", padding: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Twój koszyk jest pusty
            </Typography>
            <Button
              component={Link}
              to="/gallery"
              sx={{
                marginTop: 2,
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Zobacz galerię prac
            </Button>
          </Box>
        ) : (
          // Renderowanie koszyka, gdy są produkty
          <Box width="100%" mb={4}>
            {cartItems.map((item) => (
              <Paper
                key={item.id}
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  marginBottom: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    overflow: "hidden",
                    marginRight: 2,
                  }}
                >
                  <img
                    src={require(`../assets/images/artworks/${item.imageLink}`)}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Cena: {item.currentPrice.toFixed(2)} zł
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    disabled={item.quantity === item.numberOf}
                  >
                    +
                  </Button>
                </Box>
                <Button onClick={() => removeFromCart(item.id)}>Usuń</Button>
              </Paper>
            ))}
          </Box>
        )}

        {/* Suma cen */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Suma: {totalPrice.toFixed(2)} zł
          </Typography>
        </Box>

        {/* Przycisk przejścia do kolejnego kroku */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/cartdelivery" // Zmiana linku do kolejnej strony
            sx={{
              width: "200px",
              fontSize: "16px",
              textTransform: "none",
            }}
          >
            Przejdź dalej
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ShoppingCart;
