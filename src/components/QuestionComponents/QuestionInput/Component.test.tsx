import React from "react";
import { render, screen } from "@testing-library/react";
import Component from "./Component";

test("默认属性", () => {
  render(<Component />);
  const p = screen.getByText("输入框标题");
  expect(p).toBeInTheDocument();

  const input = screen.getByPlaceholderText("请输入...");
  expect(input).toBeInTheDocument();
});

test("传入属性", () => {
  render(<Component title="新的标题" placeholder="新的提示" />);
  const p = screen.getByText("新的标题");
  expect(p).toBeInTheDocument();

  const input = screen.getByPlaceholderText("新的提示");
  expect(input).toBeInTheDocument();
});
