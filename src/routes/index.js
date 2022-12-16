import React, { useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AdminPage from "../views/AdminPage";
import DayOffPage from "../views/DayOffPage";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import ShowDayOffPage from "../views/ShowDayOffPage";
import Management from "../views/AdminPage/UserPage";
import MyProfilePage from "../views/MyProfilePage";
import UserGroupPage from "../views/UserGroupPage";
import ChangePasswordPage from "../views/ChangePasswordPage";
import Page404 from "../views/page-404";

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
          <Route path="/request-log-off" element={<DayOffPage/>} />
          <Route path="/log-off" element={<ShowDayOffPage/>} />
          <Route path="/admin/user" element={<Management />} />
          <Route path="/user-group" element={<UserGroupPage/>} />
          <Route path={"admin"} element={<AdminPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/404" element ={<Page404/>}/>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default RouterApp;
