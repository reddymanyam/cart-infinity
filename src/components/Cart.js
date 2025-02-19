import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  Container,
  Grid,
  Divider,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = ({ cart, setCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[index] = {...updatedCart[index], quantity: newQuantity};
    setCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 'bold', 
        display: 'flex', 
        alignItems: 'center',
        mb: 4 
      }}>
        <ShoppingCartIcon sx={{ mr: 1 }} />
        Your Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5, 
            textAlign: 'center',
            borderRadius: 2,
            background: 'linear-gradient(to right bottom, #f8f9fa, #e9ecef)'
          }}
        >
          <Box sx={{ mb: 3 }}>
            <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.7 }} />
          </Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', mb: 2 }}>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button 
            component={RouterLink} 
            to="/" 
            variant="contained" 
            color="primary"
            startIcon={<ArrowBackIcon />}
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 8,
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                {cart.map((product, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider />}
                    <Box sx={{ 
                      p: { xs: 2, sm: 3 },
                      display: 'flex', 
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'center' : 'flex-start'
                    }}>
                      <CardMedia
                        component="img"
                        image={product.image || "https://via.placeholder.com/150"}
                        alt={product.title}
                        sx={{ 
                          width: isMobile ? '100%' : 120,
                          height: isMobile ? 180 : 120,
                          objectFit: 'cover',
                          borderRadius: 1,
                          mb: isMobile ? 2 : 0
                        }}
                      />
                      <Box sx={{ 
                        flexGrow: 1, 
                        ml: isMobile ? 0 : 3,
                        textAlign: isMobile ? 'center' : 'left' 
                      }}>
                        <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 'bold' }}>
                          {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {product.description}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                          ₹{product.price.toLocaleString()}
                        </Typography>
                        
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: isMobile ? 'center' : 'flex-start' 
                        }}>
                          <IconButton 
                            color="primary" 
                            onClick={() => updateQuantity(index, (product.quantity || 1) - 1)}
                            size="small"
                            sx={{ border: '1px solid', borderColor: 'divider' }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ mx: 2, minWidth: '30px', textAlign: 'center' }}>
                            {product.quantity || 1}
                          </Typography>
                          <IconButton 
                            color="primary" 
                            onClick={() => updateQuantity(index, (product.quantity || 1) + 1)}
                            size="small"
                            sx={{ border: '1px solid', borderColor: 'divider' }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: isMobile ? 'row' : 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: isMobile ? 2 : 0,
                        ml: isMobile ? 0 : 2
                      }}>
                        <Button 
                          variant="contained" 
                          color="primary"
                          size={isMobile ? "small" : "medium"}
                          startIcon={<ShoppingBagIcon />}
                          sx={{ 
                            mb: isMobile ? 0 : 2,
                            mr: isMobile ? 2 : 0,
                            borderRadius: 6,
                            textTransform: 'none'
                          }}
                        >
                          Buy Now
                        </Button>
                        <IconButton 
                          color="error" 
                          onClick={() => removeItem(index)}
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: 'error.light',
                              color: 'white'
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </React.Fragment>
                ))}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  borderBottom: '2px solid',
                  borderColor: 'primary.main',
                  pb: 1,
                  mb: 3
                }}>
                  Order Summary
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Subtotal ({cart.length} items)</Typography>
                    <Typography variant="body1" fontWeight="medium">₹{calculateTotal().toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Shipping</Typography>
                    <Typography variant="body1" color="success.main">FREE</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Tax</Typography>
                    <Typography variant="body1">₹{(calculateTotal() * 0.18).toFixed(2)}</Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    ₹{(calculateTotal() * 1.18).toLocaleString()}
                  </Typography>
                </Box>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  size="large"
                  sx={{ 
                    py: 1.5,
                    mb: 2,
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  Proceed to Checkout
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="error" 
                  fullWidth
                  startIcon={<DeleteIcon />}
                  onClick={() => setCart([])}
                  sx={{ 
                    borderRadius: 8,
                    textTransform: 'none'
                  }}
                >
                  Clear Cart
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Cart;