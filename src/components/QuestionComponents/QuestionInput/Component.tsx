import { Typography, Input } from "antd";
import React, { FC } from "react";
import { QuestionInputPropsType, QuestionInputDefaultProps } from "./interface";

const { Paragraph } = Typography;
const QuestionInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType,
) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }; //解构默认属性，props有的话覆盖默认属性

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;
