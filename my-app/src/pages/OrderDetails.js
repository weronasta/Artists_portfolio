import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useParams } from "react-router-dom";

// Przykładowe losowe produkty dla zamówienia
const sampleProducts = [
  { id: 1, title: "Obraz 'Kwiaty'", price: 150.0, image: "https://source.unsplash.com/300x200/?art,flowers" },
  { id: 2, title: "Obraz 'Pejzaż'", price: 220.0, image: "https://source.unsplash.com/300x200/?art,landscape" },
  { id: 3, title: "Obraz 'Abstrakcja'", price: 180.0, image: "https://source.unsplash.com/300x200/?art,abstract" },
  { id: 4, title: "Obraz 'Portret'", price: 95.0, image: "https://source.unsplash.com/300x200/?art,portrait" },
];

export default function OrderDetails() {
  const { id } = useParams(); // Pobiera ID zamówienia z URL

  return (
    <Box sx={{ padding: 3, maxWidth: 900, margin: "auto", marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Szczegóły zamówienia #{id}
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Produkty w zamówieniu:
      </Typography>

      <Grid container spacing={3}>
        {sampleProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography color="text.secondary">{product.price.toFixed(2)} zł</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
