import React, { FC, useEffect, useState } from "react";
import { FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Space, Typography } from "antd";
import styles from "./Logo.module.scss";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { MANAGE_INDEX_PATHNAME, HOME_PATHNAME } from "../router";

//从redux获取用户信息判断点击logo是去manage还是去home页面，注意声明周期，用useEffect和useState监测用户信息变动
const Logo: FC = () => {
  const { Title } = Typography;
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATHNAME);
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space style={{ height: 64 }}>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小牧问卷</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
