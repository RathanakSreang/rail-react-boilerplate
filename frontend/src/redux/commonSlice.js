import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    pageLoading: true,
    currentNav: 'profile',
    modalPasswordOpen: false
  },
  reducers: {
    setPageLoading: (state, action) => {
      state.pageLoading = action.payload;
    },
    setNavbar: (state, action) => {
      state.currentNav = action.payload;
    },
    toggleModalPassword: (state, action) => {
      state.modalPasswordOpen = action.payload;
    }
  },
})

export const {
  setPageLoading,
  setNavbar,
  toggleModalPassword,
} = commonSlice.actions

export default commonSlice.reducer
