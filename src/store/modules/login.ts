import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authorization: JSON.parse(localStorage.getItem('authorization') as string) || {},
        token: JSON.parse(localStorage.getItem('token') as string) || {},
        userInfo: {}
    },
    reducers: {
        setAuthorizaion(state, actions) {
            state.authorization = actions.payload
            localStorage.setItem('authorization', JSON.stringify(actions.payload))
        },
        setToken(state, actions) {
            state.token = actions.payload
            localStorage.setItem('token', JSON.stringify(actions.payload))
        },
        setUserInfor(state, actions) {
            state.userInfo = actions.payload
        }
    }
})

export const { setAuthorizaion, setToken, setUserInfor } = userSlice.actions

export default userSlice