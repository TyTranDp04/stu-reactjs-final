import React from 'react'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import ManagementUser from '../../components/Admin/ManagementUser'
import Layout from '../../layout'
import logo from '../../assets/images/stlogo.png'

const Management = () => {
  return (
    <>
         <HelmetProvider>
        <Helmet>
          <title>Management User</title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
    <Layout>
      <ManagementUser/>
    </Layout>
    </>
  )
}

export default Management