import React, { FC } from "react";
import { Typography } from "antd";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";

const { Title } = Typography;
const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType,
) => {
  const {
    text = "",
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProps, ...props }; //解构默认属性，props有的话覆盖默认属性
  const getFontsize = (level: number) => {
    if (level == 1) return "24px";
    if (level == 2) return "20px";
    if (level == 3) return "16px";
    return "16px";
  };
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? "center" : "start",
        marginBottom: 0,
        fontSize: getFontsize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
