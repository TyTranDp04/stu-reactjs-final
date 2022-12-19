import { yupResolver } from '@hookform/resolvers/yup'
import { gapi } from 'gapi-script'
import React, { useEffect } from "react"
import { GoogleLogin } from 'react-google-login'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import * as yup from "yup"
import stlogo from '../../assets/images/power_red.svg'
import { loginAction, loginGoogleActionFailed, loginGoogleActionSuccess } from '../../stores/slices/user.slice'
import { Button, Container, ForgotPass, ForgotPassH4, Form, FormHeader, H2, Input, LoginTitle, Section, StImg, StImgDiv, TextBlack, TextRed } from "./style.js"

const schema = yup.object().shape({
  Gmail: yup.string()
    .required('Please enter a valid email address'),
  Password: yup.string()
    .required('Please enter a valid password'),
}).required();

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(loginAction(data));
  };

  const clientId = '432304146543-6865d8t8d9m7g4isuakferb1t5dujqma.apps.googleusercontent.com';

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const onSuccess = (res) => {
    let account = res.profileObj.email.includes('@devplus.edu.vn');
    if (account) {
      dispatch(loginGoogleActionSuccess(res.profileObj))
    } else {
      // alert('Login failed, Your account must include "...@devplus.edu.vn"');
      dispatch(loginGoogleActionFailed("Your account is invalid !!!"))
    }
  };

  const onFailure = (err) => {
    console.log('failed:', err);
  };

  return (
    <Section className="container-fluid">
      <Container className="container">
        <Form className="col-lg-6" onSubmit={handleSubmit(onSubmit)}>
          <FormHeader>
            <StImgDiv><StImg src={stlogo} /></StImgDiv>
            <LoginTitle><H2>Log Off SRS</H2></LoginTitle>
          </FormHeader>
          <label>Email</label>
          <Input
            {...register("Gmail")}
            type="email"
            placeholder="Enter your email address"
          />
          <TextRed>{errors.Gmail?.message}</TextRed>
          <br />
          <label>Password</label>
          <Input
            {...register("Password")}
            type="password"
            placeholder="Enter your password"
          />
          <TextRed>{errors.Password?.message}</TextRed>
          <ForgotPass><ForgotPassH4></ForgotPassH4></ForgotPass>
          <Button type="submit">Submit</Button>
          <TextBlack>Or</TextBlack>
          <GoogleLogin
            className="login-google"
            clientId={clientId}
            buttonText="Log in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
          // isSignedIn={true}
          />
          <ToastContainer
            style={{ display: "block", position: "fixed", zIndex: "99999" }}
            autoClose={1000}
          />
        </Form>
      </Container>
    </Section>
  );
};
export default Login;