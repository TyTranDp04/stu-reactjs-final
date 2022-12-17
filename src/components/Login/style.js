import styled from "styled-components";
import logo from "../../assets/images/bg-01.png";

export const GoogleIcon = styled.img`
  max-width: 100%;
  height: auto;
`
export const ForgotPassH4 = styled.h4`
  font-size: 13px;
  font-weight: bold;
  color: #8000FF;
  cursor: pointer;
  opacity: 1;
  &:hover {
    opacity: 0.7;
  }
`
export const ForgotPass = styled.div`
  width: 100%;
  padding-top: 10px;
  text-align: right;
`
export const StImgDiv = styled.div`
  width: 100%;
`
export const StImg = styled.img`
  max-width: 100%;
  height: auto;
`
export const Section = styled.section`
  background: url(${logo});
  background-size: cover;
  background-position: center;
  font-size: 15px;
  line-height: 26px;
  min-height:100vh;
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
export const H2 = styled.h2`
  color: #333333;
  font-size: 40px;
  line-height: 45px;
  padding: 0px 0px 40px;
  font-weight: 700;
@media (max-width:992px){
  padding:0px 0px 3px;
}
@media (max-width:767px){
  padding: 0px;
}
@media (max-width:480px){
  font-size: 22px;
}
`;

export const LoginTitle = styled.div`
  text-align: center;
  width: 100%;
  @media (max-width:992px){
    padding:20px;
  }
  @media (max-width:767px){
    padding: 0px;
  }
  @media (max-width:480px){
    padding: 0px;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-weight: bold;
  background-color: #ffffff;
  padding: 40px 55px 104px;
  width: 500px;
  height: 100%;
  border-radius: 5px;

  .login-google {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 12px;
    color: #111111 !important;
    border: 1px solid #8000FF !important;
    font-family: 'Rubik', sans-serif !important;
    border-radius: 4px !important;
    font-size: 16px !important;
  }
  .icon-google {
    display: inline-block;
    width: 16px;
    margin-right: 5px;
  }
  
@media (max-width:992px){
  width:auto;
  padding: 70px 55px 90px;
}

@media(max-width:480px){
  padding: 50px 55px 70px;
}
`;
export const Input = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 0.35rem;
  border-radius: 4px;
  width: 100%;
  position: relative;
  outline: none;
  &:before {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    width: 100%;
    max-width: 1300px;
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const TextRed = styled.div`
  color: red;
  text-align: left;
`;
export const TextBlack = styled.div`
  color: #111111;
  text-align: center;
  margin-top: 12px;
  width: 100%;
`;
export const Button = styled.button`
  cursor: pointer;
  border: none;
  align-self: center;
  margin-top: 12px;
  font-size: 1rem;
  padding: 10px;
  border-radius: 4px;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  color: #fff;
  width: 100%;
  background: #8000FF;

  &:hover {
    opacity: 0.8;
    border-radius: 25px;
  }
`;