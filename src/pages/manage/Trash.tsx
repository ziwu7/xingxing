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
} from "antd";
import { useTitle } from "ahooks";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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
const Trash: FC = () => {
  useTitle("回收站");
  const { Title } = Typography;
  const { confirm } = Modal;
  const [questionList, setquestionList] = useState(rawQuestionList);
  const [selectedIds, setselectedIds] = useState<string[]>([]);
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
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger onClick={del}>
            删除
          </Button>
        </Space>
        <Divider />
      </div>
      <Table
        dataSource={questionList}
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
      onOk: () => alert(`删除${selectedIds}`),
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
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && tableelment}
      </div>
      <div className={styles.footer}> 分页more</div>
    </>
  );
};

export default Trash;
