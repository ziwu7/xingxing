import React, { FC, useEffect, useState, useRef, useMemo } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./common.module.scss";
// import { produce } from "immer";
import { Typography, Spin, Empty } from "antd";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { useParams, useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../../services/question";
import {
  LIST_PAGE_PARM_KEY,
  LIST_PAGE_SIZE,
  LIST_SEARCH_PARM_KEY,
} from "../../constant";
// const rawQuestionList = [
//   {
//     _id: "q1", //_id用这个是因为后端moogodb用的这个，方便统一
//     title: "wen1",
//     isPublished: true,
//     isStar: true,
//     answerCount: 5,
//     createAt: "3月10日 10:22",
//   },
//   {
//     _id: "q2",
//     title: "wen2",
//     isPublished: false,
//     isStar: false,
//     answerCount: 7,
//     createAt: "3月20日 19:32",
//   },
//   {
//     _id: "q3",
//     title: "wen3",
//     isPublished: true,
//     isStar: true,
//     answerCount: 3,
//     createAt: "3月30日 12:22",
//   },
// ];
const List: FC = () => {
  // const { data = {}, loading, error } = useLoadQuestionListData();
  // const { list = [], total = 0 } = data;
  useTitle("我的问卷");
  // const [questionList, setquestionList] = useState(rawQuestionList);
  const [started, setStarted] = useState(false); //是否已加载，（防抖有延时时间，优化显示交互）
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]); //上滑加载更多是，累计显示的总数据量
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length; //总数据量判断
  const { Title } = Typography;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARM_KEY) || "";

  //监测keyword变化时重置信息
  useEffect(() => {
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);
  //执行获取数据，真正要加载的
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );

  //触发执行tryLoadMore，防抖，定义防抖函数为tryLoadMore,加载更多 主函数
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      console.log(bottom);
      console.log(document.documentElement.clientHeight);
      //当loadMore显示出来时bottom <= document.documentElement.clientHeight，重要，要用document.documentElement.clientHeight， 不能是document.body.clientHeight
      if (bottom <= document.documentElement.clientHeight) {
        console.log("loadmore!!!");
        load(); //真正获取数据
        setStarted(true);
      }
    },
    { wait: 1000 },
  );

  //1.组件刚渲染时加载，或url变化时加载（keyword变化时重新加载
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);
  //2.滚动到底部时也加载
  useEffect(() => {
    console.log(haveMoreData);

    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore); //防抖
    }

    return () => {
      window.removeEventListener("scroll", tryLoadMore); //解绑事件
    };
  }, [searchParams, haveMoreData]); //URL变化时依然重新监听滚动事件,首次加载时更新haveMoreData
  // const add = () => {
  //   const newwen = {
  //     id: "q4" + Math.random().toString().slice(-3),
  //     title: "wen" + Math.random().toString().slice(-3),
  //     isPublished: false,
  //   };
  //   // setquestionList((prev) => [...prev, newwen]);
  //   setquestionList(
  //     produce((draf) => {
  //       draf.push(newwen);
  //     }),
  //   );
  // };
  // const del = (id: string) => {
  //   setquestionList(
  //     // questionList.filter((q) => {
  //     //   if (q.id === id) return false;
  //     //   else return true;
  //     // }), //filter 方法的参数是个箭头函数,在箭头函数的函数体有多行语句时,需要在末尾添加逗号
  //     produce((draf) => {
  //       const index_del = draf.findIndex((q) => q._id === id);
  //       draf.splice(index_del, 1);
  //     }),
  //   );
  // };
  // const pub = (id: string) => {
  //   setquestionList(
  //     // questionList.map((q) => {
  //     //   if (q.id !== id) return q;
  //     //   else return { ...q, isPublished: true };
  //     // }),
  //     produce((draf) => {
  //       const pub_value = draf.find((q) => q._id === id);
  //       if (pub_value) pub_value.isPublished = true;
  //     }),
  //   );
  // };

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多...</span>;
    return <span>开始加载下一页</span>;
  }, [loading, haveMoreData]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* <div style={{ height: "2000px" }}></div> */}
        {/* <div style={{ textAlign: "center" }}>{loading && <Spin />}</div> */}
        {list.length > 0 &&
          list.map((question: any) => {
            const { _id } = question;
            return <QuestionCard key={_id} {...question} />;
          })}
        {/* <button onClick={add}>新增问卷</button> */}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}> {LoadMoreContentElem}</div>
      </div>
    </>
  );
};

export default List;
