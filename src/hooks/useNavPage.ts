//处理页面跳转异常，登录时访问注册和登陆页自动跳转到我的问卷页，没登录时访问我的问卷则自动跳到登录页
//放在MainLayout和QuestionLayout用,2个平级的顶级首页
import useGetUserInfo from "../hooks/useGetUserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  MANAGE_INDEX_PATHNAME,
  LOGIN_PATHNAME,
} from "../router";

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();
  //useEffect来监测根据waitingUserData为false时才开始判断
  useEffect(() => {
    if (waitingUserData) return;
    //登录状态注册页和登陆页访问时自动跳到我的问卷
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    //未登录状态时访问我的问卷地址(需要登录才能访问的)时自动跳转登录页
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname]);
}

export default useNavPage;
