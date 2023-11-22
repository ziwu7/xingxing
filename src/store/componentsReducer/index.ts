import { produce } from "immer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { getNextSelectedId, inserNewComponent } from "./utils";
import cloneDeep from "lodash.clonedeep";
import { nanoid } from "nanoid";
export type ComponentInfoType = {
  fe_id: string; // 后面解释
  title: string;
  type: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: ComponentInfoType[];
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
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
      inserNewComponent(state, newComponent);
    },
    //修改组件属性
    changeComponentProps: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
    ) => {
      const { componentList } = state;
      const { fe_id, newProps } = action.payload;

      const curComp = componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.props = { ...curComp.props, ...newProps }; //用新属性覆盖，不能直接解构newProps赋值，可能newProps只有部分属性不全
      }
    },
    //删除画布选中组件
    removeSelectedComponent: (state: ComponentStateType) => {
      const removeId = state.selectedId;

      //重新设置selectedId 先重置selectedId再操作下面的删除组件，否则顺序会乱
      const newSelectedId = getNextSelectedId(removeId, state.componentList);
      state.selectedId = newSelectedId;

      state.componentList = state.componentList.filter((c) => {
        if (c.fe_id == removeId) return false;
        else return true;
      });
    },
    //隐藏/显示画布选中组件
    changeComponentHidden: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
    ) => {
      const { fe_id, isHidden } = action.payload;

      //重新设置selectedId,先重置selectedId再操作下面的隐藏组件，否则顺序会乱
      let newSelectedId = "";
      if (isHidden) {
        //隐藏
        newSelectedId = getNextSelectedId(fe_id, state.componentList);
      } else {
        //显示
        newSelectedId = fe_id;
      }
      state.selectedId = newSelectedId;
      const curComp = state.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.isHidden = isHidden;
      }
    },
    //锁定/解锁组件isLocked
    toggleComponentLocked: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string }>,
    ) => {
      const { fe_id } = action.payload;
      const curComp = state.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.isLocked = !curComp.isLocked;
      }
    },
    //复制选中组件
    copySelectedComponent: (state: ComponentStateType) => {
      const { selectedId } = state;
      const curComp = state.componentList.find((c) => c.fe_id === selectedId);
      if (!curComp) return;
      state.copiedComponent = cloneDeep(curComp);
    },
    //粘贴已复制的组件
    pasteCopiedComponent: (state: ComponentStateType) => {
      const { copiedComponent } = state;
      if (!copiedComponent) return;
      copiedComponent.fe_id = nanoid();
      inserNewComponent(state, copiedComponent);
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} = componentSlice.actions;
export default componentSlice.reducer;
