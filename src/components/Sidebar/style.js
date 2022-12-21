import styled from "styled-components";

export const SidebarCol = styled.div`
  text-align: left;
  height:92vh;
  position:relative;
  display:flex;
  flex-direction: column;
  align-items:center;
  background-color: #8000ff;
  @media (max-width: 800px) {
    padding: 0 0 0 35px;
  }
  @media (max-width: 680px) {
    padding: 0 0 0 30px;
  }
  @media (max-width: 576px) {
    padding-left: 25px;
    width: 25%;
  }
  @media (max-width: 425px) {
    padding-left: 18px;
  }
  .dropdown-item{
    background-color:#8000ff;
    width:auto;
  }
`
export const Fabar = styled.div`
display: flex;
justify-content:center;
align-items: center;
`
export const P = styled.p`
font-size:20px;
font-weight:700;
color:#fff;
margin-bottom:0px;

`
export const BtnArrow = styled.div`
position: absolute;
top: 20%;
right:-10%;
height:30px;
width:30px;
background-color: #fff;
color:#8000ff;
border-radius:50%;
font-size:22px;
display:flex;
justify-content: center;
align-items: center;
cursor:pointer;
&:hover{
  opacity:0.8;
}
`
export const Row = styled.div`
padding-bottom:20px;
height:50px;
`
export const SidebarInner = styled.div`
  margin-bottom: 30px;
  min-width:100%;
`
export const SidebarCategoryGr = styled.div`
min-width:100%;
padding-left:10px;
`
export const SidebarCategory = styled.h4`
  font-size: 18px;
  padding-bottom:10px;
  color: #fff;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    color: rgb(247,148,29);
  }
  a {
    color: #111111;
    text-decoration: none;
    &:hover {
      color: rgb(247,148,29);
    }
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
  @media (max-width: 576px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
  @media (max-width: 425px) {
    font-size: 10px;
  }
`
export const SidebarDesc = styled.div`
  padding-bottom:20px;
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