import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userActions';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser({ username, password });
      const token = localStorage.getItem('token');
      if (token) {
     
        navigate('/');
      } else {
        console.error('Token is not saved in localStorage');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Don't have an account? <Button onClick={() => navigate('/register')} sx={{ textTransform: 'none' }}>Register here</Button>
      </Typography>
    </Box>
  );
};

export default LoginPage;