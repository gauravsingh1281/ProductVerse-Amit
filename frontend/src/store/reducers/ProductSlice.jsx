import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    products: [],
}
const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      loadproducts:(state,action)=>{
        state.products = action.payload;
      },
      loadlazyproducts:(state,action)=>{
        state.products = [...state.products , ...action.payload];
      }
    },

})
export default ProductSlice.reducer;
export const { loadproducts,loadlazyproducts }= ProductSlice.actions; 