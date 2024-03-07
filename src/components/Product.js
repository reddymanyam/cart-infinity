import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';

const Product = ({ items, cart, setCart }) => {

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = { id, price, title, description, imgSrc };
    setCart([...cart, obj]);
    console.log("Cart element = ", cart);
    toast.success('Item added to cart', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer />
      <Grid container spacing={1} style={{paddingLeft:"30px" , marginTop:'15px', marginBottom:'15px'}}>
        {items.map((product) => (
          <Grid item key={product.id} md={3} textAlign="center">
            <Card sx={{ width:'250px' }}>
              <Link to={`/product/${product.id}`}>
                <CardMedia
                  component="img"
                  height="auto"
                  image={product.imgSrc}
                  alt={product.title}
                  style={{width:'200px',padding:'15px'}}
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button variant='contained'  size="small" style={{marginLeft:'8px'}}>₹{product.price} </Button>
                <Button variant='contained' size="small" color="primary" style={{marginLeft:'8px'}} onClick={() => addToCart(product.id, product.price, product.title, product.description, product.imgSrc)}>
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Product;
