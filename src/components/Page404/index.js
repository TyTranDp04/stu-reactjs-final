import React from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import logo from "../../assets/images/power_red.svg";
import { Body, Btn, Container, Content, H1 } from './style';

const Layout404 = () => {
  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet>
          <title>404</title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <Container className='container-fluid'>
        <div style={{ padding: "10px" }} className='text-start'>
          <Link to="/">
            <Btn>Back To Home</Btn>
          </Link>
        </div>
        <Body>
          <div>
            <Content>404</Content>
            <H1>Page Not Found</H1>
          </div>
        </Body>
      </Container>
    </React.Fragment>
  )
}

export default Layout404