import { configureStore } from '@reduxjs/toolkit'
import currentQuestionReducer from './currentQuestionSlice'
import userNameReducer from './authSlice'
export const store = configureStore({
  reducer: {
    currentQuestion: currentQuestionReducer,
    userName: userNameReducer,
  },
})