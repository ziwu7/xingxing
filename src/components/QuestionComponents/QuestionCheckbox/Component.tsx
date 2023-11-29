import React, { FC } from "react";
import { Typography, Checkbox, Space } from "antd";
import {
  QuestionCheckboxPropsType,
  QuestionCheckboxdefaultType,
} from "./interface";

const Component: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType,
) => {
  const { Paragraph } = Typography;
  const { title, isVertical, list } = {
    ...QuestionCheckboxdefaultType,
    ...props,
  };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map((opt) => {
          const { text, value, checked } = opt;
          return (
            <Checkbox key={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;
