import React, { FC, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./ManageLayout.module.scss";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Space, Divider, message } from "antd";
import { createQuestionService } from "../services/question";
import { useRequest } from "ahooks";
const ManageLayout: FC = () => {
  const nav = useNavigate();
  // const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  // async function handleCreateClick() {
  //   setLoading(true);
  //   const data = await createQuestionService();
  //   const { id } = data || {};
  //   if (id) {
  //     nav(`/question/edit/${id}`);
  //     message.success("创建成功！");
  //     setLoading(false);
  //   }
  // }
  const {
    loading,
    error,
    run: handleCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: (result) => {
      nav(`/question/edit/${result.id}`);
      message.success("创建成功！");
    },
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button
              type="primary"
              size="large"
              onClick={handleCreateClick}
              icon={<PlusOutlined />}
              disabled={loading}
            >
              新建问卷
            </Button>
            <Divider style={{ borderTop: "transparent" }} />
            <Button
              type={pathname.startsWith("/manage/list") ? "default" : "text"}
              size="large"
              onClick={() => nav("/manage/list")}
              icon={<BarsOutlined />}
            >
              我的问卷
            </Button>
            <Button
              type={pathname.startsWith("/manage/star") ? "default" : "text"}
              size="large"
              onClick={() => nav("/manage/star")}
              icon={<StarOutlined />}
            >
              星标问卷
            </Button>
            <Button
              type={pathname.startsWith("/manage/trash") ? "default" : "text"}
              size="large"
              onClick={() => nav("/manage/trash")}
              icon={<DeleteOutlined />}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ManageLayout;
