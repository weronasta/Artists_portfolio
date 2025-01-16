import React, { useState } from "react";
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Paper } from "@mui/material";

function ShippingMethods() {
  const [selectedShipping, setSelectedShipping] = useState("courier");

  // Dostępne opcje wysyłki
  const shippingOptions = [
    { id: "courier", label: "Kurier - 15.00 zł" },
    { id: "parcelLocker", label: "Paczkomat - 10.00 zł" },
    { id: "postOffice", label: "Odbiór w punkcie - 8.00 zł" },
  ];

  // Obsługa zmiany opcji wysyłki
  const handleChange = (event) => {
    setSelectedShipping(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        marginTop: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "left", // Wyrównanie do lewej
          width: "100%",
        }}
      >
        Wybierz sposób wysyłki
      </Typography>
      <RadioGroup value={selectedShipping} onChange={handleChange}>
        {shippingOptions.map((option) => (
          <Paper
            key={option.id}
            elevation={2}
            sx={{
              padding: 2,
              marginBottom: 1,
              display: "flex",
              alignItems: "center",
              border:
                selectedShipping === option.id
                  ? "2px solid #9c27b0" // Podświetlenie aktywnej opcji
                  : "1px solid rgba(0, 0, 0, 0.12)",
              transition: "border-color 0.3s",
            }}
          >
            <FormControlLabel
              value={option.id}
              control={<Radio />}
              label={option.label}
              sx={{
                flex: 1,
              }}
            />
          </Paper>
        ))}
      </RadioGroup>
    </Box>
  );
}

export default ShippingMethods;