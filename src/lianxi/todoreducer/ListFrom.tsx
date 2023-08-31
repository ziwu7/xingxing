import React, { ChangeEvent, FC, useContext, useState } from "react";
import { TodoContext } from "./Tododemo";
import { nanoid } from "nanoid";
const ListFrom: FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [text, setText] = useState("");

  function handlesubmit(event: ChangeEvent<HTMLFormElement>) {
    console.log(event);
    event.preventDefault();
    if (!text.trim()) return;
    const newtodo = {
      id: nanoid(5),
      title: text,
    };
    dispatch({ type: "add", payload: newtodo });
  }
  function handlechange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setText(event.target.value);
  }

  return (
    <div>
      <p>ListFrom</p>
      <form onSubmit={handlesubmit}>
        <label htmlFor="to">what?? </label>
        <input id="to" type="text" onChange={handlechange} value={text} />
        <button type="submit">tijiao{state.length}</button>
      </form>
    </div>
  );
};
export default ListFrom;
