import React from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../contexts/CartContext";

function ShoppingCart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

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
        Zawartość koszyka
      </Typography>
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
              <IconButton
                onClick={() =>
                  updateQuantity(item.id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton
                onClick={() =>
                  updateQuantity(item.id, item.quantity + 1)
                }
              >
                <AddIcon />
              </IconButton>
            </Box>
            <IconButton onClick={() => removeFromCart(item.id)}>
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default ShoppingCart;
