import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderRow = styled.div`
  background-color: #8000ff;
  margin:0px;
  @media (max-width:767.5px){
    .dropdown-toggle::after{
      content:none;
      padding:0px;
     }
     .dropdown-toggle{
      padding:0px;
     }
     background-color:#fff;
     border-bottom:1px solid #D8D8D8;
  }
`
export const DivLogo = styled.div`
position:relative;
display:flex;
justify-content: center;
align-items: center;
padding:0px;
padding-bottom:20px;
@media(max-width:996.5px){
    width:24% !important;
  }
@media (max-width:767.5px){
  display:none;
}
`
export const HeaderWrapper = styled.div`
`
export const HeaderBg = styled.div`
  background-color: #4B5C6B;
  height: 10px;
`
export const HeaderInner = styled.div`

`
export const HeaderLogo = styled.div`
  text-align: left;
  cursor: pointer;
  padding: 0;

  @media (max-width: 576px) {
    width: 16.66666667%;
  }
`
export const HeaderLogoWrapper = styled.div`
  padding-left: 35px;
  padding-bottom: 10px;

  @media (max-width: 900px) {
    padding-left: 45px;
  }
  @media (max-width: 800px) {
    padding-left: 40px;
  }
  @media (max-width: 680px) {
    padding-left: 35px;
  }
  @media (max-width: 576px) {
    padding-left: 30px;
  }
  @media (max-width: 425px) {
    padding-left: 20px;
  }
`
export const HeaderLogoInner = styled.div`
  width: 70px;
  height: 70px;
  @media (max-width: 900px) {
    width: 50px;
    height: 50px;
  }
  @media (max-width: 576px) {
    width: 40px;
    height: 40px;
  }
  @media (max-width: 425px) {
    width: 35px;
    height: 35px;
  }
`
export const StImg = styled.img`
  object-fit: cover;
  height: 50px;
  max-width: 100%;
`
export const HeaderLogoff = styled.div`
  display: flex;
  padding:0px;
  background-color:#fff;
  align-items: center;
  justify-content: flex-end;
  border-bottom:1px solid #8D8D8D;
@media(max-width:996.5px){
  width:76% !important;
}
  @media (max-width:767.6px){
     background-color:#fff;
     width:100% !important;
     border:none;
  }
  @media (max-width: 576px) {
    width: 83.33333333%;
  }
`
export const HeaderLogoffButton = styled.button`
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid rgb(247, 148, 29);
  background-color: rgb(247, 148, 29);
  color: #fff;
  opacity: 1;

  @media (max-width: 576px) {
    padding: 5px;
    font-size: 13px;
  }

  @media (max-width: 425px) {
    padding: 5px;
    font-size: 10px;
  }
  &:hover {
    opacity: 0.8;
  }
`
export const HeaderAvatar = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #4B5C6B;
  border-radius: 50%;
  margin: 0 30px 0 20px;

  cursor: pointer;
  background-color: #fff;

  @media (max-width: 576px) {
    width: 30px;
    height: 30px;
    padding: 3px;
    margin: 0 10px 0 10px;
  }

  @media (max-width: 425px) {
    margin: 0 0 0 10px;
  }
  &:hover {
    color: #8000FF;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    margin : -1px 10px 10px -1px;  
  }
`
export const DropdownLogo = styled.div`
text-decoration-line:none;
.droplogo{
  background-color: #8000ff;
  border : 0px;
  display : flex;
  --bs-btn-active-bg: #00aeef;
}
.dropdown-toggle::after{
  border-top:0;
}
.content{
  text-decoration-line:none;
  &:hover {
    background-color : #f1c40f;
  }
}
`

export const Back = styled.a`
text-decoration-line:none;
color: var(--bs-dropdown-link-color);
&:hover{
  color:black;
}
`
export const Backdiv = styled.div`
text-decoration-line:none;
color: var(--bs-dropdown-link-color);
&:hover{
  color:black;
}
`

export const StyleLink = styled(Link)`
text-decoration-line:none;
`

export const ResetImg = styled.img`
width: 30px;
height: auto;
padding-right:5px;
`

export const HeaderName = styled.p`
color: white;
margin : 0;
font-size: 18px;
`

export const SidebarHeader = styled.div`
.dropdown-toggle::after{
  content:none;
}
`
export const DivP = styled.div`
display:flex;
justify-content:center;
align-items:center;
`
export const SidebarDesc = styled.div`
  padding-bottom:10px;
  .dropdown-item:focus{
    background-color:#8000ff;
  }
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      font-weight: bold;
    }
  }
  @media (max-width: 576px) {
    font-size: 13px;
  }
  @media (max-width: 425px) {
    font-size: 10px;
  }
`

export const SidebarInner = styled.div`
  margin-bottom: 30px;
  padding:0px;
  min-width:100%;
    .dropdown-toggle::after{
    content:none;
  }
`