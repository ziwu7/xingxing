import { ComponentInfoType } from "./index";

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
