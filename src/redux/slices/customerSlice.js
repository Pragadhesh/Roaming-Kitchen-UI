import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    storelatitude: null,
    storelongitude: null,
    customerlatitude: null,
    customerlongitude: null
}

const customerSlice = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {
        updateCustomerLocation: (state,action) => {
            state.storelatitude = action.payload.storelatitude
            state.storelongitude = action.payload.storelongitude
            state.customerlatitude = action.payload.customerlatitude
            state.customerlongitude = action.payload.customerlongitude
        }

    }
})

export const {updateCustomerLocation} = customerSlice.actions

export default customerSlice.reducer