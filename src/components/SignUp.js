import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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
  Link as MuiLink,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    setIsLoading(true);
    
    createUserWithEmailAndPassword(database, email, password)
      .then((data) => {
        setTimeout(() => {
          setIsLoading(false);
          navigate('/login');
        }, 1000); // Simulate loading for better UX
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        alert(`Failed to sign up: ${errorMessage}`);
      });
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password strength assessment
  const checkPasswordStrength = (value) => {
    setPassword(value);
    let strength = 0;
    
    if (value.length > 6) strength += 1;
    if (value.length > 10) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[0-9]/.test(value)) strength += 1;
    if (/[^A-Za-z0-9]/.test(value)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return '#f44336';
    if (passwordStrength <= 3) return '#ff9800';
    return '#4caf50';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
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
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Join our community and start shopping
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => checkPasswordStrength(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon color="action" />
                    </InputAdornment>
                  ),
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
              
              {password && (
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Password Strength: 
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: getPasswordStrengthColor(),
                        fontWeight: 'bold' 
                      }}
                    >
                      {getPasswordStrengthLabel()}
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      height: 4, 
                      width: '100%', 
                      bgcolor: '#e0e0e0', 
                      borderRadius: 2,
                      mt: 0.5
                    }}
                  >
                    <Box 
                      sx={{ 
                        height: '100%', 
                        width: `${(passwordStrength / 5) * 100}%`, 
                        bgcolor: getPasswordStrengthColor(),
                        borderRadius: 2,
                        transition: 'width 0.3s ease'
                      }} 
                    />
                  </Box>
                </Box>
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    value="agreeTerms"
                    color="primary"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    sx={{
                      color: '#21b095',
                      '&.Mui-checked': {
                        color: '#21b095',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <MuiLink 
                      href="#" 
                      sx={{
                        color: '#21b095',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Terms of Service
                    </MuiLink>
                    {' '}and{' '}
                    <MuiLink 
                      href="#" 
                      sx={{
                        color: '#21b095',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Privacy Policy
                    </MuiLink>
                  </Typography>
                }
                sx={{ mt: 1 }}
              />

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
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>

              <Box sx={{ mt: 2, mb: 2 }}>
                <Divider>
                  <Typography variant="body2" color="text.secondary">
                    OR SIGN UP WITH
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
                  Already have an account?{' '}
                  <MuiLink 
                    component={Link}
                    to="/login" 
                    sx={{
                      color: '#21b095',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Log in
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;