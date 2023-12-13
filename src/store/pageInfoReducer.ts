import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type pageInfoStateType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
};

const INIT_STATE: pageInfoStateType = {
  title: "",
  desc: "",
  js: "",
  css: "",
  // isPublished: false, //如果设置了，在stat页加载时会闪一下404效果（http://localhost:3000/question/stat/0）
};

export const pageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    //重置、初始化页面信息
    resetPageInfo: (
      state: pageInfoStateType,
      action: PayloadAction<pageInfoStateType>,
    ) => {
      return action.payload;
    },
    //重置页面标题
    changePageTitle: (
      state: pageInfoStateType,
      action: PayloadAction<string>,
    ) => {
      state.title = action.payload;
    },
  },
});

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
