import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { items } from "./Data";
import Product from "./Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Typography, Button, CardMedia, Grid } from "@mui/material";

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const filterProduct = items.filter((product) => product.id == id);
    setProduct(filterProduct[0]);

    const related = items.filter((item) => item.category === filterProduct[0].category && item.id !== filterProduct[0].id);
    setRelatedProducts(related);
  }, [id]);

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = { id, price, title, description, imgSrc };
    setCart([...cart, obj]);
    toast.success("Item added to cart", {
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
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={product.imgSrc}
              alt={product.title}
              sx={{ width: '100%', height: 'auto', borderRadius: '4px' }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {product.price} ₹
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                addToCart(
                  product.id,
                  product.price,
                  product.title,
                  product.description,
                  product.imgSrc
                )
              }
              sx={{ mt: 2 }}
            >
              Add To Cart
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Related Products
      </Typography>
      <Product cart={cart} setCart={setCart} items={relatedProducts} />
    </>
  );
};

export default ProductDetail;
