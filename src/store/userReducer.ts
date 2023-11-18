import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";

export type UserStateType = {
  username: string;
  nickname: string;
};

const INIT_STATE: UserStateType = { username: "", nickname: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>,
    ) => {
      return action.payload; //登录，设置username，nickname到redux的store中
    },
    logoutReducer: () => INIT_STATE, //退出设置回初始值即可
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;

export default userSlice.reducer;
