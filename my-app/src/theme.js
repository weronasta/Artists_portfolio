import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9c27b0", // Fioletowy kolor
    },
    secondary: {
      main: "#9c27b0", // Dodatkowy fioletowy odcień
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
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
  components: {
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          backgroundColor: "#121212",
          color: "#9c27b0",
          border: "2px solid #9c27b0",
          "&:hover": {
            backgroundColor: "#2e2e2e",
            borderColor: "#9c27b0",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: "#9c27b0", // Fioletowa ramka dla inputów
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9c27b0", // Fioletowa ramka przy hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9c27b0", // Fioletowa ramka przy focus
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #9c27b0", // Fioletowa ramka dla komponentów Paper
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #9c27b0", // Fioletowa ramka dla kart
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#9c27b0", // Fioletowa ramka dla komórek tabeli
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: "2px solid #9c27b0", // Fioletowa ramka dla dialogów
        },
      },
    },
  },
});

export default theme;
