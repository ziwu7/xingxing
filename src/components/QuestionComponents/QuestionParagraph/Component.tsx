import React, { FC } from "react";
import {
  QuestionParagraphDefaultProps,
  QuestionParagraphPropsType,
} from "./interface";
import { Typography } from "antd";
const QuestionParagraph: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType,
) => {
  const { text = "一行段落", isCenter = false } = {
    ...QuestionParagraphDefaultProps,
    ...props,
  };
  const { Paragraph } = Typography;
  const textList = text.split("\n");
  return (
    <Paragraph
      style={{ textAlign: isCenter ? "center" : "start", marginBottom: 0 }}
    >
      {textList.map((t, index) => {
        return (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        );
      })}
    </Paragraph>
  );
};

export default QuestionParagraph;
