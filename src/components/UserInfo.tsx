import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
// import { getUserInfoService } from "../services/user";
// import { useRequest } from "ahooks";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { removeToken } from "../utils/user-token";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../store/userReducer";
const UserInfo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  // const { data } = useRequest(getUserInfoService);
  // const { username, nickname } = data || {}; //要加||{}是因为上面解构的data的格式是Data | undefined ，在ahooks上可以看到
  //改为从redux获取用户信息了，很多地方要用到，不能老是request
  const { username, nickname } = useGetUserInfo();

  function logout() {
    dispatch(logoutReducer()); //清空redux里的user数据
    removeToken();
    message.success("退出成功");
    nav(LOGIN_PATHNAME);
  }
  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const Login = (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  );

  return <div>{username ? UserInfo : Login}</div>;
};
export default UserInfo;
