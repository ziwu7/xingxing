import React, { FC, useEffect } from "react";
import { Form, Checkbox, Button, Input, Space } from "antd";
import { QuestionCheckboxPropsType } from "./interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const PropComponent: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType,
) => {
  const { title, isVertical, list = [], onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list });
  }, [title, isVertical, list]);

  function handleValue() {
    if (onChange) onChange(form.getFieldsValue());
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      onValuesChange={handleValue}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "输入标题" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有选项-可删除 */}
              {fields.map((field, index) => {
                const { name, key } = field;
                return (
                  <div key={key}>
                    <Space>
                      {/* 当前选项是否选中框 */}
                      <Form.Item
                        name={[name, "checked"]}
                        valuePropName="checked"
                      >
                        <Checkbox />
                      </Form.Item>

                      {/* 当前选项输入框 */}
                      <Form.Item
                        name={[name, "text"]}
                        rules={[
                          { required: true, message: "请输入选项文字" },
                          {
                            validator(_, text) {
                              let num = 0;
                              list?.forEach((opt) => {
                                if (opt.text === text) num++; //记录text个数，大于1个则出现相同的
                              });
                              if (num === 1) return Promise.resolve();
                              return Promise.reject(
                                new Error("和其他选项重复了"),
                              );
                            },
                          },
                        ]}
                      >
                        <Input placeholder="请输入选项文字" />
                      </Form.Item>
                      {index > 1 && (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(name)}
                        />
                      )}
                    </Space>
                  </div>
                );
              })}

              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: "", value: "" })}
                  style={{ width: "60%" }}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
