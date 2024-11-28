import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import { Person, Lock, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';
import './Auth.css';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    if (!username || !email || !password || password !== confirmPassword) {
      setMessage('Please fill all fields correctly.');
      return;
    }
    
    const newUser = { username, email, password };
    const authData = JSON.parse(localStorage.getItem('authData')) || [];
    authData.push(newUser);
    localStorage.setItem('authData', JSON.stringify(authData));

    setMessage('Registration successful! You can now log in.');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <motion.div className="auth-container" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <Typography variant="h5">Register</Typography>
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
        label="Email"
        type="email"
        fullWidth
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email style={{ color: '#ffffff' }} />
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
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock style={{ color: '#ffffff' }} />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
        Register
      </Button>
      {message && (
        <Typography variant="body2" color="green" style={{ marginTop: '10px' }}>
          {message}
        </Typography>
      )}
      <Typography variant="body2" style={{ marginTop: '15px' }}>
        Already have an account? <Button onClick={onSwitchToLogin}>Login</Button>
      </Typography>
    </motion.div>
  );
};

export default RegisterForm;
