import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  CardActions,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  Paper,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Sort as SortIcon
} from '@mui/icons-material';

const Product = ({ items, cart, setCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  
  const [filteredItems, setFilteredItems] = useState(items);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const [appliedFilters, setAppliedFilters] = useState([]);

  // Extract unique categories from items
  const categories = [...new Set(items.map(item => item.category))].filter(Boolean);
  
  // Find min and max prices
  const minPrice = Math.min(...items.map(item => item.price));
  const maxPrice = Math.max(...items.map(item => item.price));

  // Apply filters
  useEffect(() => {
    let result = [...items];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(item => selectedCategories.includes(item.category));
    }
    
    // Apply price range filter
    result = result.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    
    // Apply sorting
    switch(sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-z-a":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Keep original order
        break;
    }
    
    setFilteredItems(result);
    
    // Update applied filters for chips
    const newAppliedFilters = [];
    
    if (searchTerm) {
      newAppliedFilters.push({ type: 'search', value: searchTerm });
    }
    
    selectedCategories.forEach(cat => {
      newAppliedFilters.push({ type: 'category', value: cat });
    });
    
    if (priceRange[0] > minPrice || priceRange[1] < maxPrice) {
      newAppliedFilters.push({ type: 'price', value: `₹${priceRange[0]} - ₹${priceRange[1]}` });
    }
    
    if (sortOption !== 'default') {
      const sortLabels = {
        'price-low-high': 'Price: Low to High',
        'price-high-low': 'Price: High to Low',
        'name-a-z': 'Name: A to Z',
        'name-z-a': 'Name: Z to A'
      };
      newAppliedFilters.push({ type: 'sort', value: sortLabels[sortOption] });
    }
    
    setAppliedFilters(newAppliedFilters);
    
  }, [items, searchTerm, selectedCategories, priceRange, sortOption]);

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = { id, price, title, description, imgSrc };
    setCart([...cart, obj]);
    toast.success('Item added to cart', {
      position: isMobile ? "bottom-center" : "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleRemoveFilter = (filter) => {
    switch (filter.type) {
      case 'search':
        setSearchTerm('');
        break;
      case 'category':
        setSelectedCategories(prev => prev.filter(c => c !== filter.value));
        break;
      case 'price':
        setPriceRange([minPrice, maxPrice]);
        break;
      case 'sort':
        setSortOption('default');
        break;
      default:
        break;
    }
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setSortOption('default');
  };

  // Filters section for desktop
  const filtersSection = (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        height: 'fit-content',
        position: isLargeScreen ? 'sticky' : 'static',
        top: '80px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">Filters</Typography>
        <Button 
          size="small" 
          onClick={resetAllFilters}
          disabled={appliedFilters.length === 0}
        >
          Reset All
        </Button>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">Search</Typography>
        <TextField
          fullWidth
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searchTerm ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchTerm('')}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null
          }}
        />
      </Box>
      
      {/* Categories */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">Categories</Typography>
        <FormGroup>
          {categories.map(category => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox 
                  size="small"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              }
              label={
                <Typography variant="body2">
                  {category} ({items.filter(item => item.category === category).length})
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </Box>
      
      {/* Price Range */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">Price Range</Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={minPrice}
            max={maxPrice}
            valueLabelFormat={(value) => `₹${value}`}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2">₹{priceRange[0]}</Typography>
            <Typography variant="body2">₹{priceRange[1]}</Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Sort Options */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">Sort By</Typography>
        <FormGroup>
          {[
            { value: 'default', label: 'Default' },
            { value: 'price-low-high', label: 'Price: Low to High' },
            { value: 'price-high-low', label: 'Price: High to Low' },
            { value: 'name-a-z', label: 'Name: A to Z' },
            { value: 'name-z-a', label: 'Name: Z to A' }
          ].map(option => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox 
                  size="small"
                  checked={sortOption === option.value}
                  onChange={() => setSortOption(option.value)}
                />
              }
              label={<Typography variant="body2">{option.label}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <ToastContainer />
      
      {/* Mobile Filter Button */}
      {!isLargeScreen && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<FilterIcon />}
            onClick={() => setMobileFiltersOpen(true)}
          >
            Filters
          </Button>
        </Box>
      )}
      
      {/* Applied Filters Chips */}
      {appliedFilters.length > 0 && (
        <Box sx={{ px: { xs: 2, md: 4 }, py: 1, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>Applied Filters:</Typography>
          {appliedFilters.map((filter, index) => (
            <Chip
              key={index}
              label={filter.value}
              onDelete={() => handleRemoveFilter(filter)}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
          {appliedFilters.length > 1 && (
            <Chip
              label="Clear All"
              onClick={resetAllFilters}
              size="small"
              color="secondary"
            />
          )}
        </Box>
      )}
      
      {/* Results Count */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {filteredItems.length} products found
        </Typography>
      </Box>
      
      {/* Main Content */}
      <Grid container spacing={3} sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
        {/* Filters Column - Only visible on large screens */}
        {isLargeScreen && (
          <Grid item md={3} lg={2.5}>
            {filtersSection}
          </Grid>
        )}
        
        {/* Products Grid */}
        <Grid item xs={12} md={9} lg={9.5}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {filteredItems.length > 0 ? (
              filteredItems.map((product) => (
                <Grid 
                  item 
                  key={product.id} 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  lg={3}
                  xl={2.4}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                      }
                    }}
                  >
                    {/* Image container with aspect ratio */}
                    <Box sx={{ position: 'relative', paddingTop: '75%', width: '100%' }}>
                      <Link 
                        to={`/product/${product.id}`} 
                        style={{ 
                          textDecoration: "none",
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={product.imgSrc}
                          alt={product.title}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            padding: 1,
                            backgroundColor: '#f9f9f9'
                          }}
                        />
                      </Link>
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        component="div" 
                        gutterBottom
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          fontWeight: 'medium',
                          fontSize: { xs: '0.95rem', md: '1rem' }
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          mb: 1,
                          minHeight: '2.5em'
                        }}
                      >
                        {product.description}
                      </Typography>
                      {product.category && (
                        <Chip 
                          label={product.category} 
                          size="small" 
                          sx={{ 
                            fontSize: '0.7rem', 
                            height: '20px',
                            mb: 1
                          }} 
                        />
                      )}
                    </CardContent>
                    <CardActions 
                      sx={{ 
                        justifyContent: "space-between", 
                        px: 2, 
                        pb: 2 
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: theme.palette.primary.main,
                          fontSize: { xs: '1rem', sm: '1.1rem' }
                        }}
                      >
                        ₹{product.price}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => addToCart(
                          product.id, 
                          product.price, 
                          product.title, 
                          product.description, 
                          product.imgSrc
                        )}
                      >
                        Add To Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>No products found</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters or search term to find what you're looking for.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ mt: 2 }}
                    onClick={resetAllFilters}
                  >
                    Reset Filters
                  </Button>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      
      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        sx={{ 
          '& .MuiDrawer-paper': { 
            width: '85%', 
            maxWidth: '320px',
            p: 1
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton size="small" onClick={() => setMobileFiltersOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {filtersSection}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              onClick={resetAllFilters}
              disabled={appliedFilters.length === 0}
            >
              Reset All
            </Button>
            <Button 
              variant="contained" 
              onClick={() => setMobileFiltersOpen(false)}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Product;