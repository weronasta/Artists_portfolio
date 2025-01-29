import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
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
    <Paper sx={{ padding: 3, maxWidth: 900, margin: "auto", marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista zamówień
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>ID zamówienia</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>E-mail klienta</TableCell>
              <TableCell align="right">Wartość&nbsp;(zł)</TableCell>
              <TableCell align="center">Szczegóły</TableCell>
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
                    Podgląd
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
