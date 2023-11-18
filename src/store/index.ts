import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentStateType } from "./componentsReducer";

export type StateType = {
  user: UserStateType;
  components: ComponentStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    //组件列表
    components: componentsReducer,
  },
});
