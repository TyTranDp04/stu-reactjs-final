import React, { useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ChangePassword from "../components/ChangePassword/changePassword";
import AdminPage from "../views/AdminPage";
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
          <Route path={"admin"} element={<AdminPage />} >
          </Route>
          <Route path="/changepassword" element={<AdminPage />} ></Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default RouterApp;