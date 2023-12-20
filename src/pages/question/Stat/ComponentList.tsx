import React, { FC, MouseEvent, useState } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents/index";
import { ComponentInfoType } from "../../../store/componentsReducer";

import styles from "./ComponentList.module.scss";
import classNames from "classnames";

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};
const ComponentList: FC<PropsType> = (props) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const { componentList } = useGetComponentInfo(); //获取组件信息列表等数据后，需要根据type来获取各自对应数据getComponentConfByType

  // if (loading) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: "24px" }}>
  //       <Spin />
  //     </div>
  //   );
  // }
  //获取组件配置数据，根据type, props组件配置数据生成组件
  //   function genComponent(componentInfo: ComponentInfoType) {

  //   }
  return (
    <div className={styles.canvas}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id } = c;

          const { type, props } = c;
          const componentConf = getComponentConfByType(type);
          if (componentConf == null) return null;
          const { Component } = componentConf;

          //拼接classname
          const wrapperDefaultClassName = styles["component-wrapper"];
          const selectedClassName = styles.selected;

          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId,
          });
          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default ComponentList;
