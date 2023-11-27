import { QuestionInfoDefaultProps } from "./interface";
import Component from "./Component";
import PropComponent from "./PropComponent";

export * from "./interface";

//questionInfo组件的配置
export default {
  title: "问卷信息",
  type: "questionInfo", //和后端统一
  Component, //画布用的组件
  PropComponent, //属性用的
  defaultProps: QuestionInfoDefaultProps,
};
