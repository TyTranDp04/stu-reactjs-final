import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, ContainerFluid } from '../assets/css/common'
import logo from '../assets/images/stlogo.png'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { LayoutRow } from './style'

const Layout = ({ children, title }) => {
  const userInfo = useSelector(state => state.users.userInfoState);
  const user = userInfo?.data?.user?.Gmail;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user !== 'admin@gmail.com') {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <ContainerFluid className='container-fluid'>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>

      <Container className='container'>
        <Header />
        <LayoutRow className='row'>
          <Sidebar />
          {children}
        </LayoutRow>
      </Container>
    </ContainerFluid>
  )
}

export default Layout