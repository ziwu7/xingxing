import React, { FC, useState } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { Spin, Result, Button } from "antd";
import { useTitle } from "ahooks";
import { useNavigate } from "react-router-dom";
import styles from "./Index.module.scss";
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import PageStat from "./PageStat";
import ChartStat from "./ChartStat";
const Stat: FC = () => {
  const { loading } = useLoadQuestionData();
  const { title, isPublished } = useGetPageInfo();
  const nav = useNavigate();
  useTitle(`问卷编辑-${title}`);
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponentType, setSelectedComponentType] = useState("");
  const LoadingElem = (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin />
    </div>
  );

  function genContentElm() {
    if (typeof isPublished == "boolean" && !isPublished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            subTitle="问卷未发布！"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      );
    }
    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <StatHeader />
      </div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          {loading && LoadingElem}
          {!loading && genContentElm()}
        </div>
      </div>
    </div>
  );
};

export default Stat;
