import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Link, useLocation} from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Stepper, Step, StepLabel } from "@mui/material";
import axios from "axios";

function CartSummary() {
  const { cartItems, clearCart } = useCart();
  const location = useLocation();
  const email = location.state?.email || "test@test.com";

  // Obliczanie sumy cen produktów
  const totalPrice = cartItems.reduce((acc, item) => acc + item.currentPrice * item.quantity, 0);

  // Kroki dla Steppera
  const steps = ["Cart", "Delivery", "Summary"];

  const handlePlaceOrder = async () => {
    const saleData = {
      user_email: email,
      items: cartItems.map((item) => ({
        piece: item.id,
        quantity: item.quantity,
        total_price: item.currentPrice * item.quantity,
      })),
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/add_sale", {saleData});

      if (response.status === 201) {
        clearCart();
        alert("Zamówienie zostało złożone pomyślnie!");
        window.location.reload();
      }
    } catch (error) {
        console.error("Error:", error);
    }
  };

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
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Typography variant="h4" gutterBottom>
        Summary
      </Typography>

      {/* Lista kupionych produktów */}
      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty
        </Typography>
      ) : (
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
                  Price: {item.currentPrice.toFixed(2)} zł
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* Suma cen */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total: {totalPrice.toFixed(2)} zł
        </Typography>
      </Box>

      {/* Przycisk złożenia zamówienia */}
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: 4 }}>
      <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cartdelivery"
          sx={{
            width: "200px",
            fontSize: "16px",
            textTransform: "none",
          }}
        >
          Back
        </Button>
        
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "200px",
            fontSize: "16px",
            textTransform: "none",
          }}
          onClick={handlePlaceOrder}
        >
          Place order
        </Button>
      </Box>
    </Box>
  );
}

export default CartSummary;
