import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './redux/slices/loginSlice';
import managerReducer from './redux/slices/managerSlice'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        manager: managerReducer
    }
})