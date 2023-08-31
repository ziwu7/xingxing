import { nanoid } from "nanoid";
export type TodoType = {
  id: string;
  title: string;
};
const iniValue: TodoType[] = [
  { id: nanoid(5), title: "chifan" },
  { id: nanoid(5), title: "shuijiao" },
];

export default iniValue;
