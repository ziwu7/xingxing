import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentStateType } from "./componentsReducer";
import pageInfoReducer, { pageInfoStateType } from "./pageInfoReducer";
export type StateType = {
  user: UserStateType;
  components: ComponentStateType;
  pageInfo: pageInfoStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    //组件列表
    components: componentsReducer,
    //页面设置信息
    pageInfo: pageInfoReducer,
  },
});
