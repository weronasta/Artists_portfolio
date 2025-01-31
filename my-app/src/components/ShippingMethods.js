import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Card,
  Typography,
} from "@mui/material";

export default function ShippingMethods() {
  const [selectedShipping, setSelectedShipping] = useState("courier");

  // Dostępne opcje wysyłki
  const shippingOptions = [
    { id: "courier", label: "Courier" },
    { id: "parcelLocker", label: "Parcel locker" },
    { id: "postOffice", label: "Post office" },
  ];

  // Obsługa zmiany opcji wysyłki
  const handleChange = (event) => {
    setSelectedShipping(event.target.value);
  };

  return (
    <>
    <Typography variant="h5" sx={{ mb: 2 }}>
    Choose delivery method
  </Typography>
    <FormControl component="fieldset" fullWidth>
      <Card
        sx={{
          padding: 2,
          border: "2px solid #9c27b0", // Fioletowa ramka
          transition: "border-color 0.3s",
        }}
      >
        <RadioGroup value={selectedShipping} onChange={handleChange}>
          {shippingOptions.map((option) => (
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
