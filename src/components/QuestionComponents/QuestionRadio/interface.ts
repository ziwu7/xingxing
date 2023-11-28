export type OptionType = {
  text: string;
  value: string;
};

export type QuestionRadioPropsType = {
  title?: string;
  isvertical?: boolean;
  options?: OptionType[];
  value?: string;

  //用于PropsComponent
  disabled?: boolean;
  onChange?: (newProps: QuestionRadioPropsType) => void;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: "单选标题",
  isvertical: false,
  options: [
    { text: "选项1", value: "item1" },
    { text: "选项2", value: "item2" },
    { text: "选项3", value: "item3" },
  ],
  value: "",
};
