import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email = '', password = '' } = action.payload || {};
      state.email = email;
      state.password = password;
      state.isLoggedIn = true;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
