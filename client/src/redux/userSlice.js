import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error:false 
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginStart: (state)=>{
        state.loading=true
      },
      loginSuccess: (state,action)=>{
        state.loading=false
        state.currentUser= action.payload
      },
      loginFailure: (state)=>{
        state.loading=false
        state.error=true
      },
      logout:(state)=>{
        state.currentUser= null;
        state.loading= false;
        state.error=false;
      },
      subscription: (state, action) => {
        if (state.currentUser.data.user.subscribedUsers.includes(action.payload)) {
          state.currentUser.data.user.subscribedUsers.splice(
            state.currentUser.data.user.subscribedUsers.findIndex(
              (channelId) => channelId === action.payload
            ),
            1
          );
        } else {
          state.currentUser.data.user.subscribedUsers.push(action.payload);
        }
      },
    },
  })
  export const {loginStart,loginFailure,loginSuccess,logout,subscription}= userSlice.actions
  export default userSlice.reducer