import { useSelector } from "react-redux";
import type { StateType } from "../store/index";
import type { pageInfoStateType } from "../store/pageInfoReducer";
function useGetPageInfo() {
  const pageInfo = useSelector<StateType>((state) => state.pageInfo);
  const { title, desc, js, css } = pageInfo as pageInfoStateType;
  return { title, desc, js, css };
}

export default useGetPageInfo;
