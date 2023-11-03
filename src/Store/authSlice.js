import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    password: "",
    isLoggedIn: false,
};

const authSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    setUserName(state, action) {
      const newUserName = action.payload;
      state.username = newUserName;
    },
    setPassword(state, action) {
      const newPassword = action.payload;
      state.password = newPassword;
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);
      state.isLoggedIn = true;
    },
    logout: (state) => {
      sessionStorage.clear();
      sessionStorage.removeItem("id")
      state.isLoggedIn = false;
    },
    
    
  },
});

export const { setUserName, setPassword, login , logout, isLoggedIn } = authSlice.actions;

export default authSlice.reducer;
