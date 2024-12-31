import { createSlice } from "@reduxjs/toolkit";

const intialUniversalState = {
  toastMsg: null,
  loggedInDetails: null,
  hamMenu: false,
  userInfo: undefined,

};

export const universalSlice = createSlice({
  name: "universal",
  initialState: intialUniversalState,
  reducers: {
    setToastMsg(state, action) {
      state.toastMsg = { msg: action.payload.msg, mood: action.payload.mood };
    },
    clearToastMsg(state) {
      state.toastMsg = null;
    },
    setLoginInfo(state, action) {
      state.loggedInDetails = action.payload;
    },
    clearLoginInfo(state) {
      state.loggedInDetails = null;
    },
    openMenu(state) {
      state.hamMenu = true;
    },
    closeMenu(state) {
      state.hamMenu = false;
    },
    setUserInfo(state, action) {
      state.userInfo = JSON.parse(JSON.stringify(action.payload));
    },
    changeUserInfo(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload };
    }
  },
});
