import { configureStore } from '@reduxjs/toolkit';
import { cityApi } from './services/api';
import cityReducer from './features/citySlice';

const store = configureStore({
  reducer: {
    [cityApi.reducerPath]: cityApi.reducer,
    city: cityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cityApi.middleware),
});

export default store;
