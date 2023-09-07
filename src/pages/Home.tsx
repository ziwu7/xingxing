import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../router";
import styles from "./Home.module.scss";
import axios from "axios";
const Home: FC = () => {
  // useEffect(() => {
  //   axios
  //     .get("https://mock.apifox.cn/m1/3240899-0-default/user")
  //     .then((res) => console.log("axios-lpg", res));
  // }, []);

  const nav = useNavigate();
  const { Title, Paragraph } = Typography;
  function deng() {
    nav({
      pathname: MANAGE_INDEX_PATHNAME,
      // search: "b=212",
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
        </Paragraph>
        <Button type="primary" size="large" onClick={deng}>
          开始使用
        </Button>
      </div>
    </div>
  );
};

export default Home;
