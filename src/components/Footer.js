import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { blue } from '@mui/material/colors';

const Footer = () => {
  return (
    <Box position='sticky-bottom'
      component="footer"
      sx={{
        bgcolor: blue[500],
        color: 'white',
        py: 2, 
        position:'static'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="inherit" align="center">
          © {new Date().getFullYear()} Created by <a href='https://www.linkedin.com/in/reddappa-reddy-manyam-b7032b202/' style={{textDecoration:'none', cursor:'pointer', color:'yellow', fontSize:'15px'}}> Reddy Manyam 💛</a>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
