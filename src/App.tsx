import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import routerconfig from "./router";
import Reducerdemo from "./lianxi/reducerdemo";
import Tododemo from "./lianxi/todoreducer/Tododemo";
function App() {
  return <RouterProvider router={routerconfig}></RouterProvider>;
  // return <Reducerdemo />;
  // return (
  //   <div>
  //     <Tododemo />
  //   </div>
  // );
}

export default App;
