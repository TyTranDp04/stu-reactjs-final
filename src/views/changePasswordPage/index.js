import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/stlogo.png'
import ChangePassword from '../../components/ChangePassword/changePassword.js'
import Layout from '../../layout'

const ChangePasswordPage = () => {
//   const userInfo = useSelector(state => state.users.userInfoState);
//   const user = userInfo?.data?.user?.Gmail;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//     } else if (user === 'admin@gmail.com') {
//       navigate('/admin');
//     } else {
//       navigate('/');
//     }
//   }, [user, navigate]);

  return (
    <Layout>
      <HelmetProvider>
        <Helmet>
          <title>ST Log off - log in </title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <ChangePassword />
    </Layout>
  )
}

export default ChangePasswordPage