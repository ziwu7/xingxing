import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { getUserInfoService } from "../services/user";
import { useDispatch } from "react-redux";
import { loginReducer, UserStateType } from "../store/userReducer";
//用于最外层的MainLayout和QuestionLayout ，2个页面向服务端请求用户信息，getUserInfoService，返回的用户信息是存进redux，页面都是从redux获取用户信息，所以只需返回一个是否完成请求
//放在MainLayout和QuestionLayout用,2个平级的顶级首页
function useLoadUserData() {
  //判断当前redux是否有用户信息，有就不用请求，没有再request
  const [waitingUserData, setWaitingUserData] = useState(true);
  const { username } = useGetUserInfo();
  const dispatch = useDispatch();
  //ajax
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      //将获取的username，nickname存入redux
      const { username, nickname } = result as UserStateType; //这里跟教程不同，12.20 8：44
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  useEffect(() => {
    if (username) {
      //如果监测到有用户数据就直接返回
      setWaitingUserData(false);
      return;
    }
    run(); //如果监测到没有用户数据就发起request
  }, [username]);

  return waitingUserData;
}

export default useLoadUserData;
