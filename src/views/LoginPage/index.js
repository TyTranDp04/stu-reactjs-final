import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/power_red.svg'
import Login from '../../components/Login/Login'

const LoginPage = () => {
  const userInfo = useSelector(state => state.users.userInfoState);
  const lengthPass = userInfo?.data?.Password?.length;
  const user = userInfo?.data?.Gmail;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (lengthPass < 8) {
      navigate('/change-password');
    } else {
      navigate('/');
    }
  }, [user, lengthPass, navigate]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Log Off SRS - log in</title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>

      <Login />
    </>
  )
}

export default LoginPage