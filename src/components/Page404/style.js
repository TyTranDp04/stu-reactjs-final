import styled from "styled-components";
import logo from "../../assets/images/bg-01.png";
export const Container = styled.div`
padding:0px;
background: url(${logo});
background-size: cover;
background-position: center;
min-height:100vh;
`
export const Body = styled.div`
display: flex;
justify-content:center;
align-items: center;
height: 88vh;
`
export const Content = styled.div`
width:100%;
font-size:150px;
font-weight:700;
color: #8000ff;
`
export const Btn = styled.button`
align-items: flex-start;
  background-color:#8000ff;
  border-radius: 4px;
  border:none;
  color: #ffffff;
  font-family:Rubik;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding: 11px 15px;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
`

export const H1 = styled.h1`
width: 100%;
font-weight:700;
font-size:80px;
`