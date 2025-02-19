import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  TextField,
  Box,
  Button,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Avatar,
  Fade,
  Container,
  alpha
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Menu as MenuIcon, 
  ShoppingCart as ShoppingCartIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const Navbar = ({ cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={scrolled ? 4 : 0}
        sx={{
          background: scrolled 
            ? 'linear-gradient(90deg, #1a237e 0%, #303f9f 100%)' 
            : 'linear-gradient(90deg, #303f9f 0%, #3f51b5 100%)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: scrolled ? 0.5 : 1 }}>
            {/* Mobile Menu Icon */}
            {isSmallScreen && (
              <IconButton 
                edge="start" 
                color="inherit" 
                onClick={() => setMobileOpen(true)} 
                sx={{ 
                  mr: 2,
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                flexGrow: isSmallScreen ? 1 : 0,
                fontWeight: 700,
                letterSpacing: 1,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              <Link to='/' style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ 
                  backgroundColor: '#ff9800', 
                  mr: 1,
                  boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                }}>E</Avatar>
                <span>E-Cart</span>
              </Link>
            </Typography>

            {/* Search Bar - Desktop */}
            {!isSmallScreen && (
              <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', mx: 4 }}>
                <TextField
                  fullWidth
                  placeholder="Search for products..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    backgroundColor: alpha('#fff', 0.9),
                    borderRadius: '50px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px',
                      '& fieldset': { borderColor: 'transparent' },
                      '&:hover fieldset': { borderColor: 'transparent' },
                      '&.Mui-focused fieldset': { borderColor: 'transparent', boxShadow: '0 0 8px rgba(255,255,255,0.5)' },
                    },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    }
                  }}
                />
              </Box>
            )}

            {/* Cart Icon with Animation */}
            <IconButton 
              color="inherit" 
              component={Link} 
              to={'/cart'} 
              sx={{ 
                ml: isSmallScreen ? 'auto' : 2,
                position: 'relative',
                '&:after': cart.length ? {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite',
                  boxShadow: '0 0 0 rgba(255,255,255, 0.7)',
                  opacity: 0.6,
                } : {},
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: '0 0 0 0 rgba(255,255,255, 0.7)',
                  },
                  '70%': {
                    boxShadow: '0 0 0 10px rgba(255,255,255, 0)',
                  },
                  '100%': {
                    boxShadow: '0 0 0 0 rgba(255,255,255, 0)',
                  },
                },
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <Badge 
                badgeContent={cart.length} 
                color="error" 
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#ff3d00',
                    fontWeight: 'bold',
                    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                  }
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Auth Buttons with Hover Effects */}
            {!isSmallScreen && (
              <Box sx={{ display: 'flex' }}>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/signup" 
                  startIcon={<PersonIcon />}
                  sx={{ 
                    ml: 2,
                    color: 'white',
                    borderColor: 'white',
                    borderRadius: '50px',
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderColor: 'white',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  Sign Up
                </Button>
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/login" 
                  sx={{ 
                    ml: 1,
                    borderRadius: '50px',
                    background: 'linear-gradient(45deg, #FF9800 30%, #FF5722 90%)',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    color: 'white',
                    fontWeight: 'bold',
                    px: 2,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 10px rgba(255, 105, 135, .5)',
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacer to prevent content from hiding behind fixed AppBar */}
      <Toolbar sx={{ mb: 2 }} />

      {/* Mobile Drawer */}
      <Drawer 
        anchor="left" 
        open={mobileOpen} 
        onClose={() => setMobileOpen(false)}
        sx={{ 
          '& .MuiDrawer-paper': { 
            width: '80%', 
            maxWidth: '300px',
            background: 'linear-gradient(135deg, #1a237e 0%, #303f9f 100%)',
            color: 'white'
          } 
        }}
      >
        <List sx={{ width: '100%' }}>
          {/* App Logo in Drawer */}
          <ListItem sx={{ justifyContent: 'center', pb: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: '#ff9800', mr: 1 }}>E</Avatar>
              E-Cart
            </Typography>
          </ListItem>

          {/* Mobile Search */}
          <ListItem sx={{ mt: 2 }}>
            <Box component="form" onSubmit={(e) => {
              handleSubmit(e);
              setMobileOpen(false);
            }} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                placeholder="Search products..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  )
                }}
                sx={{
                  backgroundColor: alpha('#fff', 0.9),
                  borderRadius: '50px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    '& fieldset': { borderColor: 'transparent' },
                  }
                }}
              />
            </Box>
          </ListItem>

          {/* Navigation Links */}
          <ListItemButton 
            component={Link} 
            to="/"
            onClick={() => setMobileOpen(false)}
            sx={{ 
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              borderRadius: '4px',
              mx: 1,
              mt: 2
            }}
          >
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton 
            component={Link} 
            to="/cart"
            onClick={() => setMobileOpen(false)}
            sx={{ 
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              borderRadius: '4px',
              mx: 1
            }}
          >
            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Cart
                  {cart.length > 0 && (
                    <Badge 
                      badgeContent={cart.length} 
                      color="error"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
              } 
            />
          </ListItemButton>

          {/* Auth Buttons for Mobile */}
          <ListItem sx={{ mt: 1, mb: 1, borderTop: '1px solid rgba(255,255,255,0.1)', pt: 2 }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                component={Link} 
                to="/signup"
                onClick={() => setMobileOpen(false)}
                sx={{ 
                  width: '48%',
                  color: 'white',
                  borderColor: 'white',
                  borderRadius: '50px',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white',
                  }
                }}
              >
                Sign Up
              </Button>
              <Button 
                variant="contained" 
                component={Link} 
                to="/login"
                onClick={() => setMobileOpen(false)}
                sx={{ 
                  width: '48%',
                  borderRadius: '50px',
                  background: 'linear-gradient(45deg, #FF9800 30%, #FF5722 90%)',
                  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                }}
              >
                Login
              </Button>
            </Box>
          </ListItem>
        </List>
      </Drawer>

      {/* Scroll to top button */}
      <Fade in={scrolled}>
        <Box
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            backgroundColor: '#3f51b5',
            color: 'white',
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#1a237e',
              transform: 'translateY(-3px)',
              boxShadow: '0 6px 10px rgba(0,0,0,0.4)',
            }
          }}
        >
          <KeyboardArrowUpIcon />
        </Box>
      </Fade>
    </>
  );
}

export default Navbar;