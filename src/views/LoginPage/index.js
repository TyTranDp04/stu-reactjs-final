import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/stlogo.png'
import Login from '../../components/Login/Login'

const LoginPage = () => {
  const userInfo = useSelector(state => state.users.userInfoState);
  const user = userInfo?.data?.user?.Gmail;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user === 'admin@gmail.com') {
      navigate('/admin');
    } else {
      navigate('/change-password');
    }
  }, [user, navigate]);

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