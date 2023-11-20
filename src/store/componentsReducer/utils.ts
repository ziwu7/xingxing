import { ComponentInfoType } from "./index";

export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[],
) {
  const index = componentList.findIndex((c) => c.fe_id === fe_id);

  let newSelectedId = "";
  if (componentList.length <= 1) {
    newSelectedId = "";
  } else if (index === componentList.length - 1) {
    newSelectedId = componentList[index - 1].fe_id;
  } else {
    newSelectedId = componentList[index + 1].fe_id;
  }

  return newSelectedId;
}
