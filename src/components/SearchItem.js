import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { items } from './Data';
import Product from './Product';
import { Typography, Container } from '@mui/material';

const SearchItem = ({cart, setCart}) => {
  const {term} = useParams();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const filteredData = () => {
      const data = items.filter((p) => p.title.toLowerCase().includes(term.toLowerCase()));
      setFilterData(data);
    };

    filteredData();
    
  }, [term]);

  return (
    <Container>
      {filterData.length > 0 ? (
        <Product cart={cart} setCart={setCart} items={filterData} />
      ) : (
        <Typography variant="h5" textAlign="center" marginTop={5}>
          No products found for "{term}"
        </Typography>
      )}
    </Container>
  );
};

export default SearchItem;
