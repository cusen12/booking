import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'login',
  initialState: {
    value: [],
  },
  reducers: {
    login: (state, action) => { 
      state.value = action.payload; 
    },
    logout: state => {
      state.value = []; 
      alert('Đăng xuất thành công!!!')
    }, 
  },
});

export const { login, logout } = slice.actions;   
export const userLogin = state => state.login.value;
export default slice.reducer;
