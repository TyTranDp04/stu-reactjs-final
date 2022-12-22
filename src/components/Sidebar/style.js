import styled from "styled-components";

export const SidebarCol = styled.div`
  text-align: left;
  height:100vh;
  position:relative;
  display:flex;
  flex-direction: column;
  align-items:center;
  padding:0px;
  padding-left:2.5%;
  background-color: #8000ff;
  .dropdown-toggle::after{
    content:none;
    padding:0px;
   }
   .dropdown-toggle{
    padding:0px;
   }
  @media (max-width: 800px) {
   .dropdown-toggle::after{
    content:none;
    padding:0px;
   }
   .dropdown-toggle{
    padding:0px;
   }
  }
  @media(max-width:767.5px){
    display:none;
  }
  @media (max-width: 680px) {
    
  }
  @media (max-width: 576px) {
  }
  @media (max-width: 425px) {
  
  }
  .dropdown-item{
    background-color:#8000ff;
    width:auto;
    padding:0px;
  }

`
export const Fabar = styled.div`
display: flex;
justify-content:center;
align-items: center;
`
export const P = styled.p`
font-size:18px;
font-weight:700;
color:#fff;
margin-bottom:0px;
`
export const BtnArrow = styled.div`
position: absolute;
top: 20%;
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
  display:flex;
  justify-content:space-end;
    .dropdown-toggle::after{
    content:none;
  }
  .dropdown-toggle{
    width:100%;
  }
`
export const SidebarCategoryGr = styled.div`
min-width:100%;
display:flex;
@media(max-width:800.5px){
  padding-left:0px;
}
@media (max-width: 767px){
  padding:0px;
}
`
export const SidebarCategory = styled.h4`
  font-size: 18px;
  padding-bottom:10px;
  color: #fff;
  margin-right: 5px;
  cursor: pointer;
  @media(max-width:1050px){
    font-size:11px !important;
  }
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
export const SidebarGroup = styled.div`
display:flex;
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
export const SidebarDesc = styled.div`
  padding-bottom:20px;
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

export const ToggleDrop = styled.div`
display:flex;
justify-content:space-between;
width:60%;
`