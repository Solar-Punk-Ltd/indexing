import React from "react";
import { ReactElement, useState } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../src/App";
import SearchPage from "../src/pages/SearchPage/SearchPage";

export enum ROUTES {
  APP = "/",
  SEARCH = "/search",
}

const BaseRouter = (): ReactElement => {
  return (
    <Routes>
      <Route path={ROUTES.APP} element={<App />} />
      <Route path={ROUTES.SEARCH} element={<SearchPage />} />
    </Routes>
  );
};

export default BaseRouter;
