import { configureStore } from '@reduxjs/toolkit'
import userSlice from './modules/login'
import dictionariesSlice from './modules/dictionaries'
const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [dictionariesSlice.name]: dictionariesSlice.reducer
    }
})

export default store