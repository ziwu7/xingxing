import React, { FC, useEffect } from "react";
import { QuestionInfoPropsType } from "./interface";
import { Form, Input } from "antd";
const PropComponent: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType,
) => {
  const { title, desc, onChange, disabled } = props;
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc]);
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  );
};
export default PropComponent;
