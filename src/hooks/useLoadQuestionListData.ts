import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../services/question";
import { useRequest } from "ahooks";
import {
  LIST_SEARCH_PARM_KEY,
  LIST_PAGE_PARM_KEY,
  LIST_PAGE_SIZE_PARM_KEY,
  LIST_PAGE_SIZE,
} from "../constant";
//问卷列表，星标列表，回收站共用的搜索keword，(keyword修改url，该hook根据url参数进行请求获得对应的特定数据，属于组件间公共逻辑)

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt;
  const [serachParms] = useSearchParams();
  const keyword = serachParms.get(LIST_SEARCH_PARM_KEY) || "";
  const page = parseInt(serachParms.get(LIST_PAGE_PARM_KEY) || "") || 1;
  const pageSize =
    parseInt(serachParms.get(LIST_PAGE_SIZE_PARM_KEY) || "") || LIST_PAGE_SIZE;
  const { loading, data, error, refresh } = useRequest(
    //refresh 导出用于手动执行刷新该请求
    async () => {
      const data = await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize,
      });
      return data;
    },
    {
      refreshDeps: [serachParms], //刷新依赖项，参数变动时执行刷新
    },
  );
  return { loading, data, error, refresh };
}
export default useLoadQuestionListData;
