import { TodoType } from "./store";

export type ActionType = {
  type: string;
  payload?: any; //增加的todo 或者删除的todo的id
};

export default function reducer(state: TodoType[], action: ActionType) {
  switch (action.type) {
    case "add":
      return state.concat(action.payload);
    case "delete":
      return state.filter((todo) => todo.id != action.payload);
    default:
      throw new Error();
  }
}
