import React, { FC, MouseEvent } from "react";
import styles from "./EditCanvas.module.scss";
//临时静态展示
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Component";
// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Component";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentInfoType,
  changeSelectedId,
} from "../../../store/componentsReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents/index";

type PropsType = {
  loading: boolean;
};

//从redux获取组件配置数据，根据type, props组件配置数据生成组件
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;
  //返回一个对应的组件
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  // console.log("useGetComponentInfo", useGetComponentInfo());
  const { componentList, selectedId } = useGetComponentInfo(); //获取组件信息列表等数据后，需要根据type来获取各自对应数据getComponentConfByType
  const dispatch = useDispatch();
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation(); //阻止冒泡,防止上一层main的clearSelectedId出发
    console.log("handleClick", id);
    dispatch(changeSelectedId(id));
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, isLocked } = c;

          //拼接classname
          const wrapperDefaultClassName = styles["component-wrapper"];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          });
          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={(e) => handleClick(e, fe_id)}
            >
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          );
        })}

      {/* <div className={styles["component-wrapper"]}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  );
};
export default EditCanvas;
