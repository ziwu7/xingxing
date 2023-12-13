import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer";
import { pageInfoSlice, resetPageInfo } from "../store/pageInfoReducer";
function useLoadQuestionData() {
  const { _id = "" } = useParams();
  console.log("id", _id);
  const dispatch = useDispatch();

  //ajax加载
  const { data, loading, error, run } = useRequest(
    async (_id: string) => {
      if (!_id) throw new Error("没有问卷id");
      const data = await getQuestionService(_id); //返回id，componentList，title，

      return data;
    },
    {
      manual: true,
    },
  );
  //监听data数据,把componentList写入redux
  useEffect(() => {
    if (!data) return;
    const {
      title = "",
      desc = "",
      js = "",
      css = "",
      isPublished = false, //
      componentList = [],
    } = data;

    //获取默认的selectedId
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }
    //组件数据存入redux
    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null }),
    );

    //设置页面数据存入redux
    dispatch(resetPageInfo({ isPublished, title, desc, js, css }));
  }, [data]);

  //监听_id变化才执行
  useEffect(() => {
    run(_id);
  }, [_id]);

  //整个函数最后返回,data已经写入redux不用最终返回了
  return { loading, error };
}
export default useLoadQuestionData;
