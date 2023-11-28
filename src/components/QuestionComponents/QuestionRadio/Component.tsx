import React, { FC } from "react";
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from "./interface";
import { Space, Typography, Radio, RadioChangeEvent } from "antd";

const { Paragraph } = Typography;
const Component: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType,
) => {
  const {
    title,
    isvertical,
    options = [],
    value,
  } = { ...QuestionRadioDefaultProps, ...props };
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
  };
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction={isvertical ? "vertical" : "horizontal"}>
          {options.map((item) => {
            return (
              <Radio key={item.value} value={item.value}>
                {item.text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Component;
