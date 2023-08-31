import React, { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
const Login: FC = () => {
  useTitle("小牧问卷-登陆");
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("b");
  return (
    <div>
      <p>Login{keyword}</p>
      <button onClick={() => nav(-1)}>fanhui</button>
    </div>
  );
};

export default Login;
