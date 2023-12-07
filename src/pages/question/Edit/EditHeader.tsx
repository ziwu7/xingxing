import React, { FC, useState, ChangeEvent, useEffect } from "react";
import styles from "./EditHeader.module.scss";
import { Button, Space, Typography, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { useKeyPress, useRequest, useDebounceEffect } from "ahooks";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { changePageTitle } from "../../../store/pageInfoReducer";
import { useDispatch } from "react-redux";
import { updateQuestionService } from "../../../services/question";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const TitleElem: FC = () => {
  const { Title } = Typography;
  const { title } = useGetPageInfo();
  const [editState, SetEditState] = useState(false);
  const dispatch = useDispatch();
  function handleEdit() {
    SetEditState(true);
  }
  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
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

const SaveButton: FC = () => {
  const { _id } = useParams();
  //保存的信息为componentList，pageInfo
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: save } = useRequest(
    async () => {
      if (!_id) return;
      await updateQuestionService(_id, { ...pageInfo, componentList });
    },
    { manual: true },
  );
  //快捷键
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });
  // 监测变化保存;
  useDebounceEffect(
    () => {
      console.log("save,id", _id);
      save();
    },
    [_id], //BUG:监测pageInfo, componentList变化时会自动多次保存用save()
    { wait: 3000 },
  );

  //监测pageInfo, componentList变化时会自动多次保存用save();就会报警很多请求 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.

  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  );
};

const PublishButton: FC = () => {
  const nav = useNavigate();
  const { _id } = useParams();
  //保存的信息为componentList，pageInfo
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: pub } = useRequest(
    async () => {
      if (!_id) return;
      await updateQuestionService(_id, {
        ...pageInfo,
        componentList,
        isPublished: true, //标志已发布
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success("发布成功！");
        nav("/question/stat/" + _id);
      },
    },
  );

  return (
    <Button
      type="primary"
      onClick={pub}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      发布
    </Button>
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
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
