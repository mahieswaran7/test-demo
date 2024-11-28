import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cities: [], // Local state for temporary updates or optimistic UI
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.cities.push(action.payload); // Temporary addition
    },
    deleteCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload); // Temporary deletion
    },
  },
});

export const { addCity, deleteCity } = citySlice.actions;
export default citySlice.reducer;
