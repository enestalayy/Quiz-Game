import { createAction, createSlice } from '@reduxjs/toolkit'

const currentQuestion = {
  value: 0,
}

export const currentQuestionSlice = createSlice({
  name: 'currentQuestion',
  initialState: currentQuestion,
  reducers: {
    increaseCurrentQuestion: (state) => {
      state.value = state.value + 1;
    },
    incrementByAmount: (state, action) => {
      const newState = { ...state };
      newState.value += action.payload;
      return newState;
    },
    resetCurrentQuestion: (state) => {
      state.value = 0
    },

  },
  
})

export const { increaseCurrentQuestion , incrementByAmount , resetCurrentQuestion } = currentQuestionSlice.actions

export default currentQuestionSlice.reducer