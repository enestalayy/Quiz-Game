import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ""
};

const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    setUserName(state, action) {
      const newUserName = action.payload;
      state.value = newUserName;
    },
  },
});

export const { setUserName } = userNameSlice.actions;

export default userNameSlice.reducer;
