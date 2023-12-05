import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export type pageInfoStateType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
};

const INIT_STATE: pageInfoStateType = {
  title: "",
  desc: "",
  js: "",
  css: "",
};

export const pageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (
      state: pageInfoStateType,
      action: PayloadAction<pageInfoStateType>,
    ) => {
      return action.payload;
    },
  },
});

export const { resetPageInfo } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
