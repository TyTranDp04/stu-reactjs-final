import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, ContainerFluid } from "../assets/css/common";
import logo from "../assets/images/power_red.svg";
import Header from "../components/Header";
import { HomeCol } from "../components/Home/style";
import Sidebar from "../components/Sidebar";
import { SidebarCategory, SidebarCol } from "../components/Sidebar/style";
import { LayoutRow } from "./style";

const Layout = ({ children, title }) => {
  const userInfo = useSelector(state => state.users.userInfoState);
  const userGoogle = userInfo?.data?.email;
  const user = userInfo?.data?.user?.Gmail;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !userGoogle) {
      navigate('/login');
    }
  }, [user, userGoogle, navigate]);
  const date = new Date();
  const current_date =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  return (
    <ContainerFluid className="container-fluid">
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <Container className="container">
        <Header />
        <LayoutRow className="row">
          <Sidebar />
          {children}
        </LayoutRow>
      </Container>
    </ContainerFluid>
  );
};

export default Layout;
