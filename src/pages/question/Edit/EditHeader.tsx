import React, { FC, useState, ChangeEvent } from "react";
import styles from "./EditHeader.module.scss";
import { Button, Space, Typography, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, EditOutlined } from "@ant-design/icons";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { changePageTitle } from "../../../store/pageInfoReducer";
import { useDispatch } from "react-redux";
const TitleElem: FC = () => {
  const { Title } = Typography;
  const { title } = useGetPageInfo();
  const [editState, SetEditState] = useState(false);
  const dispatch = useDispatch();
  function handleEdit() {
    SetEditState(true);
  }
  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(changePageTitle(event.target.value));
  }
  if (editState)
    return (
      <Input
        value={title}
        onChange={handleValueChange}
        onPressEnter={() => SetEditState(false)}
        onBlur={() => SetEditState(false)}
      />
    );
  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={handleEdit} />
    </Space>
  );
};

const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button icon={<LeftOutlined />} type="link" onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.center}>
          <EditToolbar />{" "}
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
