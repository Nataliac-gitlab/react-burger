import React from "react";
import { AppHeader } from "../components/app-header/app-header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
