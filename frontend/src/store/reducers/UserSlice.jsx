import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    // {
    //     id: null,
    //     name: "",
    //     email: "",
    //     password: "",
    //     isAdmin: false,
    //     cart: []
    // }
}
const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginuser: (state, action) => {
            state.user = action.payload;
        },
        logoutuser: (state, action) => {
            state.user = null;
        }
    },
})
export default UserSlice.reducer;
export const { loginuser, logoutuser } = UserSlice.actions;