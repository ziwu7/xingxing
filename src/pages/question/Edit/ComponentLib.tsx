import { Typography } from "antd";
import React, { FC } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import {
  componentConfGroup,
  ComponentConfType,
} from "../../../components/QuestionComponents";
import styles from "./ComponentLib.module.scss";

import { addComponent } from "../../../store/componentsReducer";
const { Title } = Typography;
function getComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c;
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(
      addComponent({ fe_id: nanoid(), title, type, props: defaultProps }),
    );
  }
  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}
const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupName, groupId, components } = group;
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{
                fontSize: "16px",
                marginTop: index > 0 ? "20px" : "0px",
              }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => getComponent(c))}</div>
          </div>
        );
      })}
    </>
  );
};

export default Lib;
