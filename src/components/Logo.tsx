import React, { FC } from "react";
import { FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Space, Typography } from "antd";
import styles from "./Logo.module.scss";
const Logo: FC = () => {
  const { Title } = Typography;
  return (
    <div className={styles.container}>
      <Link to="/">
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
