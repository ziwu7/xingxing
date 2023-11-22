import { ComponentInfoType, ComponentStateType } from "./index";

export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[],
) {
  //剔除隐藏的
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);

  let newSelectedId = "";
  if (visibleComponentList.length <= 1) {
    newSelectedId = "";
  } else if (index === visibleComponentList.length - 1) {
    newSelectedId = visibleComponentList[index - 1].fe_id;
  } else {
    newSelectedId = visibleComponentList[index + 1].fe_id;
  }

  return newSelectedId;
}

//将action中addComponent的逻辑抽离出来，在pasteCopiedComponent中也用到这个插入组件逻辑
export function inserNewComponent(
  state: ComponentStateType,
  newComponent: ComponentInfoType,
) {
  const { selectedId, componentList } = state;
  const index = componentList.findIndex((c) => c.fe_id === selectedId);
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
}
