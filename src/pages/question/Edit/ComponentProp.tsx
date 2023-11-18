import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
const NoProp: FC = () => {
  return <div>未选中组件</div>;
};
//根据画布选中的组件，获取其type，props，根据type找到组件配置，进而解析并生成属性组件PropComponent
const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;
  const { type, props } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoProp />;
  const { PropComponent } = componentConf;
  return <PropComponent {...props} />;
};

export default ComponentProp;
