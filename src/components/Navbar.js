import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    // navigate('/login');
    window.location.reload();
  };

  useEffect(()=>{
    if (token === null) {
      navigate('/login');
      console.log('Token not found');
    } 
    else{
      setIsLoggedIn(true)
    }
  })

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          InterestAndChat
        </Typography>
        {
          isLoggedIn && (
        <Button color="inherit" onClick={() => navigate('/dashboard')}>
          Dashboard
        </Button>
        )
        }
        
        {/* {
          !isLoggedIn && (
          <Button color="inherit" onClick={() => navigate('/login')}>
          Login
        </Button>)} */}
        {
          isLoggedIn && (
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>)
        }
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
