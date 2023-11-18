import React, { FC, useState } from "react";
import styles from "./common.module.scss";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  Divider,
  Modal,
  Spin,
  message,
} from "antd";
import { useRequest, useTitle } from "ahooks";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
import {
  updateQuestionService,
  deleteQuestionService,
} from "../../services/question";

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
const Trash: FC = () => {
  useTitle("回收站");
  const {
    data = {},
    loading,
    // error,
    refresh, //在下面恢复的请求成功时再执行刷新
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

  const { Title } = Typography;
  const { confirm } = Modal;
  // const [questionList, setquestionList] = useState(rawQuestionList);
  const [selectedIds, setselectedIds] = useState<string[]>([]);
  //恢复
  const { run: cover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, //防止抖动间隔，用于例如点击按钮，短时间内点击很多次也执行1次
      onSuccess() {
        message.success("已恢复");
        refresh(); //成功遍历把selectedIds的多个问卷的恢复设置为（isDeleted: false）时，最后执行refresh刷新重新获取数据
        setselectedIds([]);
      },
    },
  );

  //永久删除
  const { run: deleteQuestion } = useRequest(
    async () => deleteQuestionService(selectedIds),
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success("已删除");
        refresh(); //成功遍历把selectedIds的多个问卷的删除时，最后执行refresh刷新重新获取数据
        setselectedIds([]);
      },
    },
  );

  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing" style={{ color: "green" }}>
            {" "}
            已发布{" "}
          </Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷数",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
    },
  ];
  const tableelment = (
    <>
      <div>
        <Space>
          <Button
            type="primary"
            onClick={cover}
            disabled={selectedIds.length === 0}
          >
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            删除
          </Button>
        </Space>
        <Divider />
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`);
            setselectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );
  function del() {
    confirm({
      title: "确认彻底删除吗？",
      icon: <ExclamationCircleOutlined />,
      content: "删除后不可找回！",
      onOk: deleteQuestion,
    });
  }
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <div style={{ textAlign: "center" }}>{loading && <Spin />}</div>
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading && list.length > 0 && tableelment}
      </div>
      <div className={styles.footer}>
        {" "}
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Trash;
