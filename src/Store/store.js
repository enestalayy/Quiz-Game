import { configureStore } from '@reduxjs/toolkit'
import currentQuestionReducer from './currentQuestionSlice'
export const store = configureStore({
  reducer: {
    currentQuestion: currentQuestionReducer,

  },
})