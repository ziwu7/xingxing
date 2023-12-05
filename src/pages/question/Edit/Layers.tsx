import React, { ChangeEvent, FC, useState } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { Button, Input, message, Space } from "antd";
import { LockOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import styles from "./Layers.module.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import {
  changeSelectedId,
  changeComponentTitle,
  toggleComponentLocked,
  changeComponentHidden,
} from "../../../store/componentsReducer";
const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  //记录当前正在修改的组件id
  const [changingTitleId, setChangingTitleId] = useState("");
  //点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find((c) => {
      c.fe_id === fe_id;
    });
    if (curComp && curComp.isHidden) {
      message.info("不能选中隐藏组件");
      return;
    }
    //当前组件未被选中，执行选中
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId("");
      return; //记得加return不然继续执行下面的代码又设置setChangingTitleId
    }
    //只有在选中状态这时候，点击修改标题
    setChangingTitleId(fe_id);
  }

  //修改标题
  function changeTitle(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value;
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }));
  }

  //修改隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }));
  }
  //修改是否锁定
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }));
  }

  return (
    <>
      {componentList.map((c) => {
        const { fe_id, title, isHidden = false, isLocked } = c;

        //拼接classname
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });
        return (
          <div key={fe_id} className={styles.wrapper}>
            <div
              className={titleClassName}
              onClick={() => handleTitleClick(fe_id)}
            >
              {fe_id === changingTitleId ? (
                <Input
                  value={title}
                  onPressEnter={() => setChangingTitleId("")}
                  onBlur={() => setChangingTitleId("")}
                  onChange={(e) => changeTitle(e)}
                />
              ) : (
                title
              )}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  type={isHidden ? "primary" : "text"}
                  icon={<EyeInvisibleOutlined />}
                  onClick={() => changeHidden(fe_id, !isHidden)}
                />
                <Button
                  size="small"
                  shape="circle"
                  type={isLocked ? "primary" : "text"}
                  icon={<LockOutlined />}
                  onClick={() => changeLocked(fe_id)}
                />
              </Space>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Layers;
