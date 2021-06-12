import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    login: (state, action) => {
      const {user} = action.payload;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      const {user} = action.payload;
      state.user = {
        ...state.user,
        ...user
      };
    },
  },
})

export const {
  login,
  logout,
  register,
  loginWithToken,
  updateUser,
} = userSlice.actions

export default userSlice.reducer
