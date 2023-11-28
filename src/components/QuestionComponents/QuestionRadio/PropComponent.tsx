import React, { FC, useEffect } from "react";
import { QuestionRadioPropsType, OptionType } from "./interface";
import { Form, Input, Checkbox, Select, Button, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { text } from "stream/consumers";
const PropComponent: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType,
) => {
  const { title, value, options, isvertical, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, value, options, isvertical });
  }, [title, value, options, isvertical]);

  function handleValueChange() {
    if (onChange) {
      const newValues = form.getFieldsValue();
      console.log("newValues", newValues);

      //add({ text: "", value: "" }) 新增的value为空需要填上唯一值
      const { options } = newValues;
      options.forEach((opt: OptionType) => {
        if (opt.value) return;
        opt.value = nanoid();
      });
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, value, options, isvertical }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "输入标题" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有选项-可删除 */}
              {fields.map((field, index) => {
                const { name, key } = field;
                return (
                  <div key={key}>
                    <Space>
                      <Form.Item
                        name={[name, "text"]}
                        rules={[
                          { required: true, message: "请输入选项文字" },
                          {
                            validator(_, text) {
                              let num = 0;
                              options?.forEach((opt) => {
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
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          //options的数据结构是label和value
          options={options?.map(({ text, value }) => ({
            label: text,
            value,
          }))}
        ></Select>
      </Form.Item>

      <Form.Item name="isvertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
