import { configureStore } from '@reduxjs/toolkit';
import areaReducer from './slices/area-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      area: areaReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
