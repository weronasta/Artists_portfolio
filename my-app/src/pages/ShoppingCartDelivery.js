import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShippingMethods from "../components/ShippingMethods";
import PaymentMethods from "../components/PaymentMethods";
import { Link } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@mui/material";

function ShoppingCartDelivery() {
  const [email, setEmail] = useState(""); // Stan do przechowywania maila
  const navigate = useNavigate();

  // Funkcja obsługująca zmianę maila
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Ustalamy kroki Steppera
  const steps = ["Koszyk", "Dostawa", "Podsumowanie"];

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
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

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
                component={Link}
                to="/cartsummary" // Zmiana linku do kolejnej strony
                sx={{
                  width: "200px",
                  fontSize: "16px",
                  textTransform: "none",
                }}
              >
                Przejdź dalej
              </Button>
            </Box>

      {/* Przycisk przejścia do poprzedniego kroku */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%", marginTop: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cart"
          sx={{
            width: "200px",
            fontSize: "16px",
            textTransform: "none",
          }}
        >
          Wstecz
        </Button>
      </Box>
    </Box>
  );
}

export default ShoppingCartDelivery;
