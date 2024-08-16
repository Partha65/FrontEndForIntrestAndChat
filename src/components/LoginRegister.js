import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Grid, Paper, Box } from '@mui/material';
import '../styles/App.css';  // Import CSS

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:8000/api/login/' : 'http://localhost:8000/api/register/';
      const data = isLogin ? { username, password } : { username, email, password };
      
      const response = await axios.post(url, data);
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        // localStorage.setItem('currentuser_id', response.data.user.id);
        console.log("Login",localStorage.getItem('token'));
        setIsLoggedIn(true);
      } else {
        setMessage("User registered successfully!");
      }
    } catch (error) {
      setMessage("Error occurred");
    }
  };

  // useEffect to check login state and redirect
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);
  return (
    <Grid container className="container-centered">
      <Paper elevation={6} className="card-wrapper-login">
        <Typography variant="h5" align="center" gutterBottom>
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {!isLogin && (
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <Box textAlign="center" marginTop={2}>
            <Button variant="outlined" color="primary" onClick={toggleForm}>
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </Button>
          </Box>
          {message && <Typography className="alert-message">{message}</Typography>}
        </form>
      </Paper>
    </Grid>
  );
}

export default LoginRegister;
