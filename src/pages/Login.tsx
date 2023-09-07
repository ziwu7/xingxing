import React, { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import { Space, Typography, Form, Input, Button, Checkbox } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";
import { REGISTER_PATHNAME } from "../router";
import { useForm } from "antd/es/form/Form";

const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "USERNAME";

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}
function deleteUser() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}
function getUser() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

const Login: FC = () => {
  useTitle("小牧问卷-登陆");
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const { Title } = Typography;
  const onFinish = (values: any) => {
    const { username, password, remember } = values || {};
    console.log(values);
    if (remember) {
      console.log("记住");
      rememberUser(username, password);
    } else {
      console.log("忘记");
      deleteUser();
    }
  };
  const [form] = useForm();
  useEffect(() => {
    const { username, password } = getUser(); //网页加载时获取数据
    form.setFieldsValue({ username, password }); //设置form数据
  }, []);
  const keyword = searchParams.get("b");
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>登录</Title>
        </Space>
        <div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            initialValues={{ remember: true }}
            form={form}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: "请输入用户名" },
                { type: "string", min: 5, max: 20, message: "长度限于5-20" },
                { pattern: /^\w+$/, message: "只能字母数字下划线" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 6, span: 16 }}
            >
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                <Link to={REGISTER_PATHNAME}>注册新用户</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
