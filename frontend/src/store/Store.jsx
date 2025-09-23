import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/UserSlice";
import ProductSlice from "./reducers/ProductSlice";


export const store = configureStore({
  reducer:{
    userReducer :UserSlice,
    productReducer :ProductSlice,

  }
})