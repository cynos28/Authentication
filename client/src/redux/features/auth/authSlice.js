 import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    idLoggedIn: false,
    user:null,
    users:[],
    twoFactor:false,
    iserror:false,
    isSuccess:false,
    isLoading:false,
    message:"",
 
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET(state){

        state.twoFactor=false;
        state.iserror=false;
        state.isSuccess=false;
        state.isLoading=false;
        state.message="";
    }
  }
});

export const {RESET} = authSlice.actions
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn; 

export default authSlice.reducer