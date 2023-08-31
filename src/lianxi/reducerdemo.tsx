import React, { FC, useReducer } from "react";

type StateType = { count: number };
type ActionType = { type: string };
const initvalue: StateType = { count: 100 };
//state bukebian
function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "jia":
      return { count: state.count + 1 };
    case "jian":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const Reducerdemo: FC = () => {
  const [state, dispatch] = useReducer(reducer, initvalue);
  return (
    <div>
      <p>Reducerdemo</p>
      <p>{state.count}</p>
      <button
        onClick={() => {
          dispatch({ type: "jia" });
        }}
      >
        +
      </button>
    </div>
  );
};

export default Reducerdemo;
