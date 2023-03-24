import { createSlice } from "@reduxjs/toolkit";

const dictionariesSlice = createSlice({
    name: 'dictionarise',
    initialState: {
        stoneColor: [],
        stoneVein: [],
    },
    reducers: {
        setStoneColor(state, actions) {
            state.stoneColor = actions.payload
        },
        setStoneVein(state, actions) {
            state.stoneVein = actions.payload
        }
    }
})

export const { setStoneColor, setStoneVein } = dictionariesSlice.actions

export default dictionariesSlice