import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Container,
} from '@mui/material';

const Cart = ({ cart, setCart }) => {
  return (
    <Container sx={{ my: 5 }}>
      {cart.length === 0 ? (
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Button component={RouterLink} to="/" variant="contained" color="warning">
            Continue Shopping...
          </Button>
        </Box>
      ) : (
        <>
          {cart.map((product, index) => (
            <Card key={index} sx={{ display: 'flex', mb: 3, width: '100%' }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={product.imgSrc}
                alt={product.title}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {product.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="contained" sx={{ mx: 1 }}>
                      {product.price} ₹
                    </Button>
                    <Button variant="contained" color="warning">
                      Buy Now
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}
          <Box textAlign="center" sx={{ my: 5 }}>
            <Button
              variant="contained"
              color="warning"
              sx={{ mx: 2 }}
             
            >
              CheckOut
            </Button>
            <Button variant="contained" color="error" onClick={() => setCart([])}>
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
