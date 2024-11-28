import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';
import { TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import { Person, Lock } from '@mui/icons-material';
import { motion } from 'framer-motion';
import './Auth.css';

const LoginForm = ({ onSwitchToRegister }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(login({ username, password }));
  };

  return (
  
    <motion.div className="auth-container" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Username"
        fullWidth
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person style={{ color: '#ffffff' }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock style={{ color: '#ffffff' }} />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body2" style={{ marginTop: '15px' }}>
        Don’t have an account? <Button onClick={onSwitchToRegister}>Register</Button>
      </Typography>
    </motion.div>
 
  );
};

export default LoginForm;
