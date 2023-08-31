import React, { FC, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./common.module.scss";
// import { produce } from "immer";
import { Typography } from "antd";
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
    _id: "q2",
    title: "wen2",
    isPublished: false,
    isStar: false,
    answerCount: 7,
    createAt: "3月20日 19:32",
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
const List: FC = () => {
  const [questionList, setquestionList] = useState(rawQuestionList);
  const { Title } = Typography;
  useTitle("我的问卷");
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
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length > 0 &&
          questionList.map((question) => {
            const { _id } = question;
            return <QuestionCard key={_id} {...question} />;
          })}
        {/* <button onClick={add}>新增问卷</button> */}
      </div>
      <div className={styles.footer}>load more</div>
    </div>
  );
};

export default List;
