import React, { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import {
  EditOutlined,
  LineOutlined,
  StarOutlined,
  DeleteOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { icons } from "antd/es/image/PreviewGroup";
type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean; //这个变量deleteQuestion是一个函数类型
  answerCount: number;
  createAt: string;
};
const QuestionCard: FC<PropsType> = (props) => {
  const { _id, title, isPublished, isStar, answerCount, createAt } = props;
  const nav = useNavigate();
  const { confirm } = Modal;

  const del = () => {
    confirm({
      title: "删除吗?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => message.success("已删除"),
    });
  };
  // const pub = (id: string) => {
  //   publishQustion(id);
  // };
  const copy_question = () => {
    message.success("已复制");
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStar && <StarOutlined style={{ color: "red" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing" style={{ color: "green" }}>
                已发布
              </Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className={styles["button-container"]}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              icon={<LineOutlined />}
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="text" icon={<StarOutlined />}>
              {isStar ? "标星" : "取消标星"}
            </Button>
            <Popconfirm
              title="确定复制问卷吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={copy_question}
            >
              <Button type="text" icon={<CopyOutlined />}>
                复制
              </Button>
            </Popconfirm>
            <Button type="text" icon={<DeleteOutlined />} onClick={del}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );

  {
    /* <strong>{title}</strong>
      &nbsp;
       */
  }
};

export default QuestionCard;
