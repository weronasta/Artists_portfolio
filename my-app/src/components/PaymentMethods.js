import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function PaymentMethods() {
  const [selectedPayment, setSelectedPayment] = useState("");

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  return (
    <Box
      mt={4}
      p={3}
      border={1}
      borderRadius={2}
      bgcolor="background.paper"
    >

      <FormControl component="fieldset">
        <RadioGroup
          aria-label="payment-methods"
          name="payment-methods"
          value={selectedPayment}
          onChange={handlePaymentChange}
        >
          <FormControlLabel
            value="credit-card"
            control={<Radio />}
            label="Karta kredytowa / debetowa"
          />
          <FormControlLabel
            value="paypal"
            control={<Radio />}
            label="PayPal"
          />
          <FormControlLabel
            value="bank-transfer"
            control={<Radio />}
            label="Przelew bankowy"
          />
          <FormControlLabel
            value="cash-on-delivery"
            control={<Radio />}
            label="Płatność przy odbiorze"
          />
        </RadioGroup>
      </FormControl>
      </Box>
  );
}

export default PaymentMethods;