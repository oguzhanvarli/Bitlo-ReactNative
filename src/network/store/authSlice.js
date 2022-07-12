import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    user : false,
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        signin :(state) => {
            state.user = true
        },
        logout : (state) => {
            state.user = false
        }
    }
})

export const {signin,logout} = authSlice.actions
export default authSlice.reducer