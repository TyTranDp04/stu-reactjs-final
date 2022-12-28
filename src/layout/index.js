import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, ContainerFluid } from "../assets/css/common";
import logo from "../assets/images/power_red.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { StImg } from "../components/Header/style";
import NewSideBar from "../components/Sidebar/newSidebar";
import { getListRoleIdAction } from "../stores/slices/roleId.slice";


const LayoutMain = ({ children, title }) => {
  const userInfo = useSelector(state => state.users.userInfoState);
  const [getOneUser, setGetOneUser] = useState();
  const URL = process.env.REACT_APP_URL_WEBSITE;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = userInfo?.data?.Gmail;
  const userID = userInfo?.data?.id;

  const lengthPass = getOneUser?.Password?.length;

  useEffect(() => {
    dispatch(getListRoleIdAction())
  }, [dispatch]);

  useEffect(() => {
    async function getOne() {
      await axios.get(`${URL}/user-item/${userID}`).then((res) => {
        setGetOneUser(res?.data.data);
      });
    }
    getOne();
  }, [userID, lengthPass, URL]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!lengthPass) {
      return
    } else if (lengthPass < 8) {
      navigate('/change-password');
    }

  }, [user, navigate, lengthPass]);

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
            <div style={{ height: "32px", margin: "8px", width: "90%", display: "flex", justifyContent: "space-evenly", alignItems: "center", background: '#8000ff', fontSize: "20px"}}>
              <div style={{ width: "30px", height: "30px", fontSize: "12px", margin: "0px" }}>
                <Link to="/"><StImg src={logo} /></Link>
              </div>
              <Link to="/" style={{ display: collapsed ? "none" : "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "#fff"}}>
                <p style={{ margin: "0px" }}>Log Off SRS</p>
              </Link>
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
