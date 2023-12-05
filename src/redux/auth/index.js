import { createSlice } from '@reduxjs/toolkit'
import auth from './thunk'

const initialState = {
    token: '',
    user: {},
    loading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // reducers: {
        // setUserAcess: (state, action) => {
        //     state.token = action.payload.token
        //     state.user = action.payload.user
        // }
    // },
    extraReducers: auth, 
})

// export const {setUserAcess} = authSlice.actions

export default authSlice.reducer