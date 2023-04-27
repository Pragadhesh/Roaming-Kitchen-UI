import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    activeCategory: "inventory"
}

const managerSlice = createSlice({
    name: 'managerSlice',
    initialState,
    reducers: {
        updateActiveCategory: (state,action) => {
            console.log("Entered update")
            console.log(action.payload)
            state.activeCategory = action.payload
        }
    }
})

export const {updateActiveCategory} = managerSlice.actions

export default managerSlice.reducer