import Component from "./Component";
import { QuestionParagraphDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
export * from "./interface";

//paragraph组件的配置
export default {
  title: "段落",
  type: "questionParagraph", //和后端统一
  Component, //画布用的组件
  PropComponent, //属性用的
  defaultProps: QuestionParagraphDefaultProps,
};
