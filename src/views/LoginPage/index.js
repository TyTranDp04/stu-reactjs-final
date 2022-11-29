import React from 'react'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import logo from '../../assets/images/stlogo.png'
import Login from '../../components/Login/Login'

const LoginPage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>ST Log off - log in </title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>

      <Login />
    </>
  )
}

export default LoginPage