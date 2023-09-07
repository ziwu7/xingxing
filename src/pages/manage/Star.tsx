import React, { FC } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./common.module.scss";
import { Typography, Empty, Spin } from "antd";
import { useTitle } from "ahooks";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
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
//     _id: "q3",
//     title: "wen3",
//     isPublished: true,
//     isStar: true,
//     answerCount: 3,
//     createAt: "3月30日 12:22",
//   },
// ];
const Star: FC = () => {
  // const [questionList, setquestionList] = useState(rawQuestionList);
  const {
    data = {},
    loading,
    error,
  } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;
  const { Title } = Typography;
  useTitle("星标问卷");

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <div style={{ textAlign: "center" }}>{loading && <Spin />}</div>
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Star;
