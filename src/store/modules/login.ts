import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authorization: JSON.parse(localStorage.getItem('authorization') as string) || {},
        token: JSON.parse(localStorage.getItem('token') as string) || '',
        userInfo: JSON.parse(localStorage.getItem('userinfo') as string) || {},
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
            localStorage.setItem('userinfo', JSON.stringify(actions.payload))
        },
        logout(state, actions) {
            state.authorization = {}
            state.token = ''
            state.userInfo = {}
            localStorage.removeItem('token')
            localStorage.removeItem('userinfo')
        }
    }
})

export const { setAuthorizaion, setToken, setUserInfor, logout } = userSlice.actions

export default userSlice