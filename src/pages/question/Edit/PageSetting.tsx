import React, { FC, useEffect } from "react";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { resetPageInfo } from "../../../store/pageInfoReducer";
const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo(); // 出来的title,desc,js,css要跟下面的form的name对应
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);
  //把表单的数据变化更新到redux
  function handleValuesChange() {
    const newValue = form.getFieldsValue();
    dispatch(resetPageInfo(newValue));
  }
  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true }, { message: "请输入标题" }]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="请输入css代码" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输入js代码" />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
