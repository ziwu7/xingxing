import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";

//统一各个组件的prop type
//要为&下面的[QuestionInputConf,QuestionTitleConf]才不报错
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType;

//统一组件的配置 type
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

//全部组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
];

//全部组件配置分组--用于组件库left 的组件分组显示
export const componentConfGroup = [
  {
    groupId: "textGroup",
    groupName: "文本显示",
    components: [QuestionTitleConf],
  },
  {
    groupId: "inputGroup",
    groupName: "用户输入",
    components: [QuestionInputConf],
  },
];

//通过type获取组件的配置
export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}