import React, { FC, useContext } from "react";
import { TodoContext } from "./Tododemo";

const List: FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  function del(id: string) {
    dispatch({ type: "delete", payload: id });
  }

  return (
    <div>
      <span>list</span>
      <ul>
        {state.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <button onClick={() => del(todo.id)}>del</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default List;
