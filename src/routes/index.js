import React, { useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AdminPage from "../views/AdminPage";
import DayOffPage from "../views/DayOffPage";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import MyProfilePage from "../views/MyProfilePage";
import Management from "../views/Management";
import UserGroupPage from "../views/UserGroupPage";
import ChangePasswordPage from "../views/ChangePasswordPage";

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
          <Route path="/admin/user" element={<Management />} />
          <Route path="/log-off" element={<DayOffPage/>} />
          <Route path="/user-group" element={<UserGroupPage/>} />
          <Route path={"admin"} element={<AdminPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default RouterApp;
