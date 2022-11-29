import React from "react"
import stlogo from '../../assets/images/stlogo.png'
import { Button, Container, ForgotPass, ForgotPassH4, Form, GoogleIcon, H2, Input, LoginTitle, Section, StImg, StImgDiv, TextBlack, TextRed } from "./style.js"
import googleIcon from '../../assets/images/ggicon.svg'
import { ToastContainer } from 'react-toastify'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const schema = yup.object().shape({
  email: yup.string()
    .required('Please enter a valid email address'),
  password: yup.string()
    .required('Please enter a valid password'),
}).required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log('data: ', data)
    // dispatch(loginAction(data));
  };
  return (
    <Section className="container-fluid">
      <Container className="container">
        <Form className="col-lg-6" onSubmit={handleSubmit(onSubmit)}>
          <StImgDiv><StImg src={stlogo} /></StImgDiv>
          <LoginTitle><H2>Login to your account</H2></LoginTitle>
          <label>Email</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your email address"
          />
          <TextRed>{errors.email?.message}</TextRed>
          <br />
          <label>Password</label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
          />
          <TextRed>{errors.password?.message}</TextRed>
          <ForgotPass><ForgotPassH4>Forgot password?</ForgotPassH4></ForgotPass>
          <Button type="submit">Submit</Button>
          <TextBlack>Or</TextBlack>
          <Button className="login-goole"><GoogleIcon src={googleIcon} className="icon-google" /> Log in with Google</Button>
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