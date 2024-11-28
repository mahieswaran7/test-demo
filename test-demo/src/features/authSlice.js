// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import authData from '../authData.json';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = authData.users.find((u) => u.username === username && u.password === password);
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
      } else {
        alert('Invalid credentials');
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
