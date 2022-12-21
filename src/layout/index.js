import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, ContainerFluid } from "../assets/css/common";
import logo from "../assets/images/power_red.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getListRoleIdAction } from "../stores/slices/roleId.slice";
import { LayoutRow } from "./style";


const Layout = ({ children, title }) => {
  const userInfo = useSelector(state => state.users.userInfoState);
  const roleId = useSelector(state => state.roleId.roleIdState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userGoogle = userInfo?.data?.email;
  const user = userInfo?.data?.user?.Gmail;
  const lengthPass = userInfo?.data?.user?.Password?.length;

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
    } else if (lengthPass < 8) {
      navigate('/change-password');
    }
  }, [user, userGoogle, navigate]);
  const date = new Date();
  const current_date =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <ContainerFluid className="container-fluid">
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <Container className="container">
        <Header
          Toggle={toggle}
          isOpen={isOpen}
        />
        <LayoutRow className="row">
          <Sidebar
            Toggle={toggle}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Container
            className={isOpen ? "col-sm-9 col-lg-10" : "col-sm-9 col-lg-11"}
            style={{ width: isOpen ? "84%" : "94%" }}
          >
            {children}
          </Container>
        </LayoutRow>
      </Container>
            <Footer />
    </ContainerFluid>
  );
};

export default Layout;
