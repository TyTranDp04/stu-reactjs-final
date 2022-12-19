import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, ContainerFluid } from "../assets/css/common";
import logo from "../assets/images/power_red.svg";
import Header from "../components/Header";
import { HomeCol } from "../components/Home/style";
import Sidebar from "../components/Sidebar";
import { SidebarCategory, SidebarCol } from "../components/Sidebar/style";
import { LayoutRow } from "./style";
import { getListRoleIdAction } from "../stores/slices/roleId.slice";

const Layout = ({ children, title }) => {
  const userInfo = useSelector(state => state.users.userInfoState);
  const roleId = useSelector(state => state.roleId.roleIdState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userGoogle = userInfo?.data?.email;
  const user = userInfo?.data?.user?.Gmail;

  const userRoleId = userInfo?.data?.user?.RoleId;
  const roleIdData = roleId?.data;
  const filterRoleId = roleIdData?.find(item => item.Id === userRoleId);
  const permission = filterRoleId?.RoleName;
  
  useEffect(() => {
    dispatch(getListRoleIdAction())
  }, [dispatch]);
  
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
        <div className="row">
          <SidebarCol className="col-sm-3 col-lg-2">
            <SidebarCategory>Account</SidebarCategory>
          </SidebarCol>
          <HomeCol
            className="col-sm-9 col-lg-10"
            style={{ display: "flex", backgroundColor: "#00aeef" }}
          >
            <SidebarCategory>
              <Link to="/account">Account / </Link>
            </SidebarCategory>
            <SidebarCategory>
              <Link to="/log-off">Days off / </Link>
            </SidebarCategory>
            <SidebarCategory>{current_date}</SidebarCategory>
          </HomeCol>
        </div>
        <LayoutRow className="row">
          <Sidebar permission={permission}/>
          {children}
        </LayoutRow>
      </Container>
    </ContainerFluid>
  );
};

export default Layout;
