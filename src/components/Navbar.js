import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Data';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';



const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filterByCategory = (category) => {
    const element = items.filter((product) => product.category === category);
    setData(element);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>E-Cart</Link>
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', m: 1}}>
          <TextField 
            fullWidth
            label="Search Products"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} style={{ fontSize: '30', color: 'grey', cursor: 'pointer' }} />
                </InputAdornment>
              )
            }}
            sx={{
              backgroundColor: '#fff', 
              borderRadius: '4px', 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main', 
                },
                '&:hover fieldset': {
                  borderColor: 'primary.dark', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'secondary.main',
                },
              }
            }}
          />

        </Box>



        <IconButton color="inherit" component={Link} to={'/cart'}  sx={{marginLeft:'70px'}}>
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button type='submit' variant='contained' sx={{ ml: 2 }}>SignUp</Button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button type='submit' variant='contained' sx={{ ml: 1 }}>Login</Button>
          </Link>
      </Toolbar>

      {location.pathname === '/' && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between',padding:'4px', backgroundColor: '#008AD8'}}>
            
            <Button color="inherit" onClick={() => setData(items)} >No Filter</Button>
            <Button color="inherit" onClick={() => filterByCategory('laptops')} >Laptops</Button>
            <Button color="inherit" onClick={() => filterByCategory('mobiles')} >Mobiles</Button>
            <Button color="inherit" onClick={() => filterByCategory('EarPods')} >EarPods</Button>
            <Button color="inherit" onClick={() => filterByCategory('tablets')}>Tablets</Button>
            <Button color="inherit" onClick={() => filterByCategory("men's")}>Men's</Button>
            <Button color="inherit" onClick={() => filterByCategory("women's")}>Women's</Button>
            <Button color="inherit" onClick={() => filterByCategory('Sports')}>Sports</Button>
            <Button color="inherit" onClick={() => filterByCategory('Books')}>Books</Button>
           
         
         
        </Box>
      )}

    </AppBar>
  );
}

export default Navbar;
