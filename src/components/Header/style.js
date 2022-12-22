import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderRow = styled.div`

  .swal2-styled.swal2-confirm {
    background-color: #8000ff;
  background-color: #8000ff;
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
  .dropdown {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row-reverse;
  }
  .dropdown-menu {
    padding: 0;
    transform: translate3d(0, 66.4px, 0px) !important;
  }
`
export const DivLogo = styled.div`
position:relative;
display:flex;
justify-content: center;
align-items: center;
padding:0px;
padding-bottom:20px;
background-color: #8000ff;
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
  height: auto;
  max-width: 100%;
`
export const HeaderLogoff = styled.div`
  display: flex;
  background-color:#fff;
  align-items: center;
  justify-content: flex-end;
  border-bottom:1px solid #8D8D8D;

  @media (max-width:767.6px){
    background-color:#fff;
  }
  @media (max-width: 576px) {
    width: 83.33333333%;
  }
  .drop-down {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }
  .dropdown-toggle {
    padding: 0;
    &:after {
      content: none !important;
    }
  }
  .header-name {
    color: #8A969C;
    font-weight: bold;
    width: 100%;
    text-align: right;
    padding-right: 5px;
    padding-bottom: 0;
  }
`
export const HeaderAvatar = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;

  @media (max-width: 576px) {
    width: 30px;
    height: 30px;
  }

  &:hover {
    color: #8000FF;
  }

  .avatar {
    min-width: 100%;
    min-height: 100%;
    border-radius: 10%;
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
  text-decoration: none;
  &:hover {
    background-color: #8000ff;
    color: #fff;
  }
`
export const HeaderDropdown = styled.div`
  width: 170px;
  height: 100%;
`
export const HeaderDropdownInner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0;
  &:hover {
    background-color: #8000ff;
  }
`
export const HeaderDropdownImg = styled.div`
  width: 30px;
  height: 30px;
  padding-right: 5px;
`
export const HeaderDropdownTitle = styled.div`

`
export const HeaderName = styled.div`
color: white;
margin : 0;
font-size: 18px;
`

export const SidebarHeader = styled.div`
.dropdown-toggle::after{
  content:none;
}
`