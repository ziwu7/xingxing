//问卷 标题

import Component from "./Component";
import { QuestionTitleDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
export * from "./interface";

//title组件的配置
export default {
  title: "标题",
  type: "questionTitle", //和后端统一
  Component, //画布用的组件
  PropComponent, //属性用的
  defaultProps: QuestionTitleDefaultProps,
};
