import { useSelector } from "react-redux";
import { StateType } from "../store/";
import { UserStateType } from "../store/userReducer";

//Logo和UserInfo组件，useLoadUserData（hooks）都使用了
function useGetUserInfo() {
  const user = useSelector<StateType>((state) => state.user);

  const { username, nickname } = user as UserStateType;
  return { username, nickname };
}

export default useGetUserInfo;
