import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Card, CardMedia, CardContent, Container, createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Tworzenie niestandardowego motywu
const theme = createTheme({
  palette: {
    mode: 'dark', // Tryb ciemny
    primary: {
      main: '#9c27b0', // Fioletowy akcent
    },
    background: {
      default: '#121212', // Ciemne tło
      paper: '#1d1d1d', // Ciemniejsze tło dla kart i innych komponentów
    },
    text: {
      primary: '#ffffff', // Biały tekst
      secondary: '#b0b0b0', // Szary tekst
    },
  },
});

function App() {
  const images = [
    { id: 1, src: 'https://via.placeholder.com/300', title: 'Image 1' },
    { id: 2, src: 'https://via.placeholder.com/300', title: 'Image 2' },
    { id: 3, src: 'https://via.placeholder.com/300', title: 'Image 3' },
    { id: 4, src: 'https://via.placeholder.com/300', title: 'Image 4' },
    { id: 5, src: 'https://via.placeholder.com/300', title: 'Image 5' },
    { id: 6, src: 'https://via.placeholder.com/300', title: 'Image 6' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ustawia globalne style, np. ciemne tło */}
      
      {/* Nagłówek */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Moja Galeria
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Podpis */}
      <Container sx={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Witamy w naszej galerii!
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Oto kolekcja naszych zdjęć. Kliknij na obrazek, aby go powiększyć.
        </Typography>
      </Container>

      {/* Galeria zdjęć */}
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {images.map((image) => (
            <Grid item key={image.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt={image.title}
                  height="200"
                  image={image.src}
                  title={image.title}
                />
                <CardContent>
                  <Typography variant="h6">{image.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
