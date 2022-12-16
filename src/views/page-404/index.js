import React from 'react'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import Layout404 from '../../components/Page404'
import logo from '../../assets/images/stlogo.png'


const Page404 = () => {
  return (
    <>
     <HelmetProvider>
        <Helmet>
          <title>404 </title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
    <Layout404/>
    </>
  )
}

export default Page404