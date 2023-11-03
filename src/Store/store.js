import { configureStore } from '@reduxjs/toolkit'
import userNameReducer from './authSlice'
export const store = configureStore({
  reducer: {
    userName: userNameReducer,
  },
})