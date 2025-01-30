import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material'; // Import ThemeProvider
import theme from '../theme'; // Import custom theme
import axios from 'axios';  // Importowanie axios

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
  },
}));

function Register() {
  const [usernameError, setUsernameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [registrationError, setRegistrationError] = React.useState('');

  const validateInputs = () => {
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    let isValid = true;

    if (!username.value || username.value.trim() === "") {
      setUsernameError(true);
      isValid = false;
    } else {
      setUsernameError(false);
    }

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (password.value !== confirmPassword.value) {
      setConfirmPasswordError(true);
      isValid = false;
    } else {
      setConfirmPasswordError(false);
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Walidacja danych wejściowych
    if (!validateInputs()) return;
  
    // Pobranie danych z formularza
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(username);
    console.log(email);
    console.log(password);
  
    try {
      // Wysyłanie danych za pomocą axios
      const response = await axios.post('http://127.0.0.1:5000/register', {
        username: username,
        login: email, // Dopasuj do backendu
        password: password,
      });
  
      // Sprawdzenie odpowiedzi backendu
      alert('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
      console.log(response.data); // Obsługa wyniku
    } catch (error) {
      // Obsługa błędów
      if (error.response) {
        if (error.response.status === 400) { // Poprawiony dostęp do statusu
          setRegistrationError('Login or email already exists.');
        } else {
          setRegistrationError('An error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <RegisterContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
            </Typography>
            {registrationError && (
            <Typography color="error" sx={{ textAlign: 'center' }}>
              {registrationError}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                error={usernameError}
                id="username"
                name="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                id="email"
                type="email"
                name="email"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                id="password"
                type="password"
                name="password"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirm-password">Confirm password</FormLabel>
              <TextField
                error={confirmPasswordError}
                id="confirm-password"
                type="password"
                name="confirm-password"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Do you already have an account?{' '}
              <Link
                href="/login"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Card>
      </RegisterContainer>
    </ThemeProvider>
  );
}

export default Register;