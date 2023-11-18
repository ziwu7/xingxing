import { useSelector } from "react-redux";
import type { StateType } from "../store/index";
import type { ComponentStateType } from "../store/componentsReducer";
//读取redux的组件数据，在多个组件用到，多个组件用到的相同逻辑抽出来做成自定义hook
function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state) => state.components,
  ) as ComponentStateType;
  const { componentList = [], selectedId } = components;
  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
  return { componentList, selectedId, selectedComponent }; //？为什么这里对象形式.返回一个对象用于解构出componentList
}

export default useGetComponentInfo;
