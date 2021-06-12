import { configureStore } from '@reduxjs/toolkit'

import userReducer from './redux/userSlice'
import commonReducer from './redux/commonSlice'

export default configureStore({
  reducer: {
    userReducer: userReducer,
    commonReducer: commonReducer
  },
})
