import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData";
import { Spin } from "antd";
import useNavPage from "../hooks/useNavPage";

const QuestionLayout: FC = () => {
  const waitingUserData = useLoadUserData();
  useNavPage(waitingUserData);
  return (
    <>
      <p>QuestionLayout</p>
      <div style={{ height: "100vh" }}>
        {waitingUserData ? (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
};

export default QuestionLayout;
