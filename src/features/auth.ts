import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface AuthState {
  authState: boolean;
  user : {
    name? : string,
    email? : string,
    phone? : string 
  }
}

const initialState: AuthState = {
  authState: false,
  user : {}
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
    setUser : (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state: AuthState, action: { payload: { auth: any } }) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthState, setUser } = authSlice.actions;
export const selectAuthState = (state: any) => state.auth.authState;
export default authSlice.reducer;
