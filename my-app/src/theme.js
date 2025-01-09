import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Ustawienie dark mode
    primary: {
      main: "#9c27b0", // Fioletowy kolor
    },
    secondary: {
      main: "#673ab7", // Dodatkowy fioletowy odcień
    },
    background: {
      default: "#121212", // Typowy ciemny kolor tła
      paper: "#1e1e1e", // Kolor tła kart/sekcji
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
});

export default theme;