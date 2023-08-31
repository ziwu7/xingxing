import React, { FC, createContext, useReducer } from "react";
import List from "./List";
import ListFrom from "./ListFrom";
import iniValue from "./store";
import reducer, { ActionType } from "./reducer";
import { TodoType } from "./store";

export const TodoContext = createContext({
  state: iniValue,
  dispatch: (action: ActionType) => {
    /*kong*/
  },
});
const Tododemo: FC = () => {
  //获取仓库的数据
  const [state, dispatch] = useReducer(reducer, iniValue);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <div>
        <List />
        <ListFrom />
      </div>
    </TodoContext.Provider>
  );
};
export default Tododemo;
