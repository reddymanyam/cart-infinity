import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { database } from './firebaseconfig';
import { 
  Avatar, 
  Button, 
  Grid, 
  Paper, 
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Container,
  Divider,
  useTheme,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    signInWithEmailAndPassword(database, email, password)
      .then((userCredential) => {
        setTimeout(() => {
          setIsLoading(false);
          navigate('/');
        }, 1000); // Simulate loading for better UX
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        alert(`Failed to log in: ${errorMessage}`);
      });
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const socialIcons = [
    { icon: <GoogleIcon />, color: '#DB4437', label: 'Google' },
    { icon: <FacebookIcon />, color: '#4267B2', label: 'Facebook' },
    { icon: <TwitterIcon />, color: '#1DA1F2', label: 'Twitter' }
  ];

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              background: 'linear-gradient(135deg, #21b095 0%, #80CBC4 100%)',
              borderRadius: '0 0 0 100%',
              zIndex: 0,
              opacity: 0.6,
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: '#21b095',
                  width: 56,
                  height: 56,
                  boxShadow: '0 4px 8px rgba(33, 176, 149, 0.3)',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(33, 176, 149, 0.4)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(33, 176, 149, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(33, 176, 149, 0)' },
                  },
                }}
              >
                <LockOutlinedIcon fontSize="large" />
              </Avatar>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #21b095 30%, #80CBC4 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mt: 1,
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Sign in to continue to your account
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#21b095',
                    },
                    borderRadius: 2,
                  },
                  mb: 2,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#21b095',
                    },
                    borderRadius: 2,
                  },
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 1,
                  mb: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{
                        color: '#21b095',
                        '&.Mui-checked': {
                          color: '#21b095',
                        },
                      }}
                    />
                  }
                  label="Remember me"
                />
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: '#21b095',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 2,
                  mb: 2,
                  borderRadius: 6,
                  padding: '12px 0',
                  background: 'linear-gradient(45deg, #21b095 30%, #80CBC4 90%)',
                  color: 'white',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  boxShadow: '0 4px 10px rgba(33, 176, 149, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 15px rgba(33, 176, 149, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)',
                    transform: 'translateX(-100%)',
                    animation: isLoading
                      ? 'shimmer 1.5s infinite'
                      : 'none',
                  },
                  '@keyframes shimmer': {
                    '100%': {
                      transform: 'translateX(100%)',
                    },
                  },
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <Box sx={{ mt: 2, mb: 2 }}>
                <Divider>
                  <Typography variant="body2" color="text.secondary">
                    OR CONTINUE WITH
                  </Typography>
                </Divider>
              </Box>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                {socialIcons.map((social, index) => (
                  <Grid item xs={4} key={index}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={social.icon}
                      sx={{
                        color: social.color,
                        borderColor: social.color,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: `${social.color}10`,
                          borderColor: social.color,
                        },
                      }}
                    >
                      {social.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link 
                    href="#/signup" 
                    sx={{
                      color: '#21b095',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign up now
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;