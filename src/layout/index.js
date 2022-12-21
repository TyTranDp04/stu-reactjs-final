import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, ContainerFluid } from "../assets/css/common";
import logo from "../assets/images/power_red.svg";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getListRoleIdAction } from "../stores/slices/roleId.slice";
import { LayoutRow } from "./style";

const Layout = ({ children, title }) => {
  const userInfo = useSelector(state => state.users.userInfoState);
  const roleId = useSelector(state => state.roleId.roleIdState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = userInfo?.data?.Gmail;
  const lengthPass = userInfo?.data?.Password?.length;

  const userRoleId = userInfo?.data?.RoleId;
  const roleIdData = roleId?.data;
  const filterRoleId = roleIdData?.find(item => item.Id === userRoleId);
  const permission = filterRoleId?.RoleName;
  
  useEffect(() => {
    dispatch(getListRoleIdAction())
  }, [dispatch]);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (lengthPass < 8) {
      navigate('/change-password');
    }
  }, [user, lengthPass, navigate]);

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
          <Sidebar permission={permission}/>
          {children}
        </LayoutRow>
      </Container>
    </ContainerFluid>
  );
};

export default Layout;
