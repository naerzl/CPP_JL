import { configureStore } from '@reduxjs/toolkit'
import userSlice from './modules/login'
const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer
    }
})

export default store