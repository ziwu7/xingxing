import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentPropsType,
  getComponentConfByType,
} from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../store/componentsReducer";
const NoProp: FC = () => {
  return <div>未选中组件</div>;
};
//根据画布选中的组件，获取其type，props，根据type找到组件配置，进而解析并生成属性组件PropComponent
const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;
  const { type, props, isLocked } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoProp />;
  const { PropComponent } = componentConf;
  function changeProps(newProps: ComponentPropsType) {
    console.log("newProps", newProps);
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  return (
    <PropComponent {...props} onChange={changeProps} disabled={isLocked} />
  );
};

export default ComponentProp;
