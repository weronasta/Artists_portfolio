import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Card,
  Typography,
} from "@mui/material";

function PaymentMethods() {
  const [selectedPayment, setSelectedPayment] = useState("");

  // Dostępne opcje płatności
  const paymentOptions = [
    { id: "credit-card", label: "Karta kredytowa / debetowa" },
    { id: "paypal", label: "PayPal" },
    { id: "blik", label: "BLIK" },
    { id: "bank-transfer", label: "Przelew bankowy" },
    { id: "cash-on-delivery", label: "Płatność przy odbiorze" },
  ];

  // Obsługa zmiany opcji płatności
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Wybierz metodę płatności
      </Typography>
      <FormControl component="fieldset" fullWidth>
        <Card
          sx={{
            padding: 2,
            border: "2px solid #9c27b0", // Fioletowa ramka
            transition: "border-color 0.3s",
          }}
        >
          <RadioGroup
            aria-label="payment-methods"
            name="payment-methods"
            value={selectedPayment}
            onChange={handlePaymentChange}
          >
            {paymentOptions.map((option) => (
              <Box
                key={option.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  transition: "background-color 0.3s",
                }}
              >
                <FormControlLabel
                  value={option.id}
                  control={<Radio />}
                  label={option.label}
                  sx={{ flex: 1 }}
                />
              </Box>
            ))}
          </RadioGroup>
        </Card>
      </FormControl>
    </>
  );
}

export default PaymentMethods;
