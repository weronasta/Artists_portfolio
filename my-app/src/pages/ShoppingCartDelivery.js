import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShippingMethods from "../components/ShippingMethods";
import PaymentMethods from "../components/PaymentMethods";

function ShoppingCartDelivery() {
  const [email, setEmail] = useState(""); // Stan do przechowywania maila
  const navigate = useNavigate();

  // Funkcja obsługująca zmianę maila
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Funkcja przechodzenia do kolejnego kroku
  const handleNextStep = () => {
    navigate("/shopping-cart-summary"); // Tu zmienisz na docelowy URL kolejnego kroku
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
      <Typography variant="h4" gutterBottom>
        Wybór metody dostawy i płatności
      </Typography>

      {/* Input na email */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <TextField
          label="Adres email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
        />
      </Box>

      {/* Komponenty do wyboru metod dostawy i płatności */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <ShippingMethods />
        <PaymentMethods />
      </Box>

      {/* Przycisk przejścia do kolejnego kroku */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextStep}
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
  );
}

export default ShoppingCartDelivery;
