import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { useParams } from "react-router-dom";

// Przykładowe lokalne obrazy dla zamówienia
const sampleProducts = [
  { id: 1, title: "Obraz 'Kwiaty'", price: 150.0, image: "img1.jpg" },
  { id: 2, title: "Obraz 'Pejzaż'", price: 220.0, image: "img2.jpg" },
  { id: 3, title: "Obraz 'Abstrakcja'", price: 180.0, image: "img3.jpg" },
  { id: 4, title: "Obraz 'Portret'", price: 95.0, image: "img4.jpg" },
];

export default function OrderDetails() {
  const { id } = useParams(); // Pobiera ID zamówienia z URL

  return (
    <Box sx={{ padding: 3, maxWidth: 900, margin: "auto", marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order details #{id}
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Products
      </Typography>

        {sampleProducts.map((product) => (
            <Card sx={{ display: "flex", padding: 2, marginBottom: 2 }}>
              {/* Obrazek po lewej */}
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100, objectFit: "cover" }}
                image={require(`../assets/images/artworks/${product.image}`)} // Załaduj obrazek lokalnie
                alt={product.title}
              />
              {/* Kontener dla tekstu i przycisku */}
              <Box sx={{ marginLeft: 2, display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                {/* Tekst po lewej */}
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <Typography variant="h6" gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography color="text.secondary">{product.price.toFixed(2)} zł</Typography>
                </Box>
              </Box>
            </Card>
        ))}
    </Box>
  );
}
