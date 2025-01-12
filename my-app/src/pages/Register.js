import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon } from '../components/CustomIcons';
import { ThemeProvider } from '@mui/material'; // Import ThemeProvider
import theme from '../theme'; // Import custom theme

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    });
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
            Załóż konto
          </Typography>
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
              <FormLabel htmlFor="username">Nazwa użytkownika</FormLabel>
              <TextField
                error={usernameError}
                id="username"
                name="username"
                placeholder="Wprowadź nazwę użytkownika"
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
                placeholder="your@email.com"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Hasło</FormLabel>
              <TextField
                error={passwordError}
                id="password"
                type="password"
                name="password"
                placeholder="Wprowadź hasło"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirm-password">Potwierdź hasło</FormLabel>
              <TextField
                error={confirmPasswordError}
                id="confirm-password"
                type="password"
                name="confirm-password"
                placeholder="Potwierdź hasło"
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
              Załóż konto
            </Button>
          </Box>
          <Divider>lub</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Register with Google')}
              startIcon={<GoogleIcon />}
            >
              Zarejestruj się z Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Register with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Zarejestruj się z Facebook
            </Button>
          </Box>
        </Card>
      </RegisterContainer>
    </ThemeProvider>
  );
}

export default Register;