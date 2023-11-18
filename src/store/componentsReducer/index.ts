import { produce } from "immer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
export type ComponentInfoType = {
  fe_id: string; // 后面解释
  title: string;
  type: string;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>; //ComponentInfoType[]   这样也行
};

const INIT_STATE: ComponentStateType = {
  selectedId: "",
  componentList: [],
};

export const componentSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    //重置所有组件,就是把新的组件数据配置进来
    resetComponents: (
      state: ComponentStateType,
      action: PayloadAction<ComponentStateType>,
    ) => {
      return action.payload;
    },
    //修改selectedId,用immer
    changeSelectedId: (
      state: ComponentStateType,
      action: PayloadAction<string>,
    ) => {
      state.selectedId = action.payload;
    },
    // 这里用immer会报错
    //  produce(
    //   (draft: ComponentStateType, action: PayloadAction<string>) => {
    //     console.log(draft);
    //     console.log(action.payload);
    //     draft.selectedId = action.payload;
    //   },
    // ),

    //添加新组件
    addComponent: (
      state: ComponentStateType,
      action: PayloadAction<ComponentInfoType>,
    ) => {
      const newComponent = action.payload;
      const { selectedId, componentList } = state;
      const index = componentList.findIndex((c) => c.fe_id === selectedId);

      console.log("index", index);

      if (index < 0) {
        //当前没组件被选中,新组件增加到最后面
        // state.componentList.concat(newComponent);
        state.componentList = [...componentList, newComponent];
      } else {
        //当前有组件被选中,新组件增加到该选中组件后面
        state.componentList.splice(index + 1, 0, newComponent);
      }
      //把新组件设置为被选中状态
      state.selectedId = newComponent.fe_id;
    },
  },
});

export const { resetComponents, changeSelectedId, addComponent } =
  componentSlice.actions;
export default componentSlice.reducer;
