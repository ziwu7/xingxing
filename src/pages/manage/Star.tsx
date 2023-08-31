import React, { FC, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./common.module.scss";
import { Typography, Empty } from "antd";
import { useTitle } from "ahooks";
import ListSearch from "../../components/ListSearch";
const rawQuestionList = [
  {
    _id: "q1", //_id用这个是因为后端moogodb用的这个，方便统一
    title: "wen1",
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: "3月10日 10:22",
  },
  {
    _id: "q3",
    title: "wen3",
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createAt: "3月30日 12:22",
  },
];
const Star: FC = () => {
  const [questionList, setquestionList] = useState(rawQuestionList);
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
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}> 分页more</div>
    </>
  );
};

export default Star;
