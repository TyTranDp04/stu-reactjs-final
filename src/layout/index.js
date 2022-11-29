import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Container, ContainerFluid } from '../assets/css/common'
import logo from '../assets/images/stlogo.png'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { LayoutRow } from './style'

const Layout = ({ children, title }) => {
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