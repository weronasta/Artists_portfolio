import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Funkcja do tworzenia zamówień (przykładowe dane)
function createOrder(id, date, status, value) {
  return { id, date, status, value };
}

// Lista przykładowych zamówień
const orders = [
  createOrder(1001, "2024-01-25", "user1@email.com", 150.99),
  createOrder(1002, "2024-01-26", "user2@email.com", 89.50),
  createOrder(1003, "2024-01-27", "user3@email.com", 220.00),
  createOrder(1004, "2024-01-28", "user4@email.com", 75.25),
  createOrder(1005, "2024-01-29", "user5@email.com", 130.99),
];

export default function OrdersPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4 }}>
      {/* Nagłówek poza Paper, ale wyrównany do szerokości tabeli */}
      <Box sx={{ maxWidth: 900, width: "100%", mb: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "left", paddingLeft: 2 }}>
          Client orders
        </Typography>
      </Box>

      <Card sx={{ padding: 3, maxWidth: 900, width: "100%" }}>
        <CardContent>
        <TableContainer sx={{ width: "100%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Client's email</TableCell>
                <TableCell align="right">Total price&nbsp;(zł)</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell align="right">{order.value.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      More
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
