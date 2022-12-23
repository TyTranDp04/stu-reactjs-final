import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, ContainerFluid } from "../assets/css/common";
import logo from "../assets/images/power_red.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { DivP, HeaderAvatar, StImg } from "../components/Header/style";
import Sidebar from "../components/Sidebar";
import NewSideBar from "../components/Sidebar/newSidebar";
import { P } from "../components/Sidebar/style";
import { getListRoleIdAction } from "../stores/slices/roleId.slice";
import { ContainerItem, LayoutRow } from "./style";


const LayoutMain = ({ children, title }) => {
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

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ContainerFluid className="container-fluid">
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>

      <Container className="container">
        <Layout>
          <Sider style={{ height: "100vh" }} className="responsiveSidebar" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div style={{ height: "32px", margin: "10px",width:"90%",display:"flex", justifyContent:"space-evenly", background: '#fff' }}>
              <div style={{width:"30px",height:"30px",fontSize:"12px",margin:"0px"}}>
              <Link to="/"><StImg src={logo} /></Link>
              </div>
              <div style={{display: collapsed? "none" : "inline-block" }}>
                <p>Day Off SRS</p>
              </div>
       
            </div>
            <NewSideBar
              collapsed={collapsed}
            />
          </Sider>
          <Layout>
            <Header />
            <Content>
              {children}
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Container>
    </ContainerFluid>
  );
};

export default LayoutMain;
