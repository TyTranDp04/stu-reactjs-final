import React from 'react'
import TableShowDayOff from '../../components/TableShowDayOff'
import Layout from '../../layout'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import logo from '../../assets/images/stlogo.png'
const ShowDayOffPage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>ST log off</title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <Layout>
        <TableShowDayOff />

      </Layout>
    </>

  )
}

export default ShowDayOffPage