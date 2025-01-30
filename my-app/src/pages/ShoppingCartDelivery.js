import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
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
        maxWidth: "1200px",
        mx: "auto",
        padding: 4,
      }}
    >

      {/* Stepper */}
      <Box sx={{ width: "100%", mb: 4}}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Typography variant="h4" gutterBottom>
       Delivery and payment
      </Typography>

      {/* Cała sekcja w jednym większym Boxie, aby przyciski były w tej samej szerokości */}
      <Box sx={{ width: "80%", mb: 4 }}>
        {/* Input na email */}
        <Box component="form" sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                  Enter your e-mail
                </Typography>
          <TextField
            required
            id="outlined"
            label="Email"
            defaultValue="nazwa@domena.com"
            value={email}
            fullWidth
            onChange={handleEmailChange}
          />
        </Box>

        {/* Komponenty do wyboru metod dostawy i płatności */}
        <ShippingMethods />
        <PaymentMethods />

        {/* Przycisk przejścia do kolejnego kroku */}
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: 4 }}>
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
            Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/cartsummary"
            state={{ email }} // Pass the email value here
            sx={{
              width: "200px",
              fontSize: "16px",
              textTransform: "none",
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ShoppingCartDelivery;
