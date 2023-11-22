import { useKeyPress } from "ahooks";
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} from "../store/componentsReducer";
import { useDispatch } from "react-redux";
function isActiveElementValid() {
  const activeElm = document.activeElement;
  if (activeElm === document.body) return true; //光标没有聚焦在input，在input时，不能调用删除组件，此时是删除input的内容
  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
  //删除组件

  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) return;
    dispatch(removeSelectedComponent());
  });

  //复制组件
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  });
  //粘贴组件
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteCopiedComponent());
  });
}

export default useBindCanvasKeyPress;
