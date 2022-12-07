import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Container, ContainerFluid } from '../assets/css/common'
import logo from '../assets/images/stlogo.png'
import Header from '../components/Header'
import { HomeCol } from '../components/Home/style'
import Sidebar from '../components/Sidebar'
import { SidebarCategory, SidebarCol } from '../components/Sidebar/style'
import { LayoutRow } from './style'

const Layout = ({ children, title }) => {
  const date = new Date();
  const current_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  
  return (
    <ContainerFluid className='container-fluid'>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>

      <Container className='container-fluid'>
        <Header />
        <div className='row'>
          <SidebarCol className='col-sm-3 col-lg-2'><SidebarCategory>Account</SidebarCategory></SidebarCol>
          <HomeCol className='col-sm-9 col-lg-10' style={{ display: "flex", backgroundColor: "#00aeef" }}>
            <SidebarCategory><Link to='/account'>Account / </Link></SidebarCategory>
            <SidebarCategory><Link to='/day-off'>Days off / </Link></SidebarCategory>
            <SidebarCategory>{current_date}</SidebarCategory>
          </HomeCol>
        </div>
        <LayoutRow className='row'>
          <Sidebar />
          {children}
        </LayoutRow>
      </Container>
    </ContainerFluid>
  )
}

export default Layout