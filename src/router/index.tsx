import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import List from "../pages/manage/List";
import Trash from "../pages/manage/Trash";
import Star from "../pages/manage/Star";
import Edit from "../pages/question/Edit/Index";
import Stat from "../pages/question/Stat/Index";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
    ],
  },
  {
    path: "/question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:_id", //兜底写在最后
        element: <Edit />,
      },
      {
        path: "stat/:_id", //兜底写在最后
        element: <Stat />,
      },
    ],
  },
  {
    path: "/*", //兜底写在最后
    element: <NotFound />,
  },
]);

export default router;

//////常用路由变量

export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_INDEX_PATHNAME = "/manage/list";
