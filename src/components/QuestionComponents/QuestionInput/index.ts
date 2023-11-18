//问卷 输入框

import Component from "./Component";
import { QuestionInputDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
export * from "./interface";

//input组件的配置
export default {
  title: "输入框",
  type: "questionInput", //和后端统一
  Component, //画布用的组件
  PropComponent, //属性用的
  defaultProps: QuestionInputDefaultProps,
};
