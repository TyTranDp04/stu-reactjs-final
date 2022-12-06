import React, { useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import TableDayOff from "../components/TableDayOff";
import AdminPage from "../views/AdminPage";
import DayOffPage from "../views/DayOffPage";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/day-off" element={<DayOffPage/>} />
          <Route path={"admin"} element={<AdminPage />} >
          </Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default RouterApp;
