import React from "react";
import { render, screen } from "@testing-library/react";

import Component from "./Component";

test("默认属性", () => {
  render(<Component />);
  const span = screen.getByText("一行段落");
  expect(span).toBeInTheDocument();
});

test("传入属性", () => {
  render(<Component text="hello" isCenter={true} />);
  const span = screen.getByText("hello");
  expect(span).toBeInTheDocument();

  const style = span.parentElement;
  expect(style!.style.textAlign).toBe("center");
});
