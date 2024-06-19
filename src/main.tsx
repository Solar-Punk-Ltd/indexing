import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router-dom";
import MainRouter from "../public/MainRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <MainRouter />
    </HashRouter>
  </React.StrictMode>
);
