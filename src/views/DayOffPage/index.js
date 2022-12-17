import React from 'react'
import TableDayOff from '../../components/TableDayOff'
import Layout from '../../layout'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import logo from '../../assets/images/stlogo.png'

const DayOffPage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>ST request day off</title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <Layout>
        <TableDayOff />
      </Layout>
    </>

  )
}

export default DayOffPage