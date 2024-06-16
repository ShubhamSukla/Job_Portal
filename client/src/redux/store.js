import {configureStore} from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { authSlice } from "./features/auth/authSlice";


export default configureStore({
    reducer:{
       [alertSlice.name]:alertSlice.reducer,
       [authSlice.name]:authSlice.reducer, 
    }
});