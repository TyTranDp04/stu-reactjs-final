import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderRow = styled.div`
  background-color: #00aeef;

  .swal2-styled.swal2-confirm {
    background-color: #8000ff;
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
  justify-content: flex-end;

  @media (max-width: 576px) {
    width: 83.33333333%;
  }
  .dropdown-toggle {
    padding: 0;
    &:after {
      content: none !important;
    }
  }
  .header-name {
    color: #fff;
    width: 100%;
    text-align: right;
    padding-right: 5px;
  }
`
export const HeaderAvatar = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  // border: 1px solid #8000ff !important;
  // background-color: #8000ff !important;
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
