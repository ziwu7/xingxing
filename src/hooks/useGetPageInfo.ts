import { useSelector } from "react-redux";
import type { StateType } from "../store/index";
import type { pageInfoStateType } from "../store/pageInfoReducer";
function useGetPageInfo() {
  const pageInfo = useSelector<StateType>((state) => state.pageInfo);
  const { title, desc, js, css, isPublished } = pageInfo as pageInfoStateType;
  return { title, desc, js, css, isPublished };
}

export default useGetPageInfo;
