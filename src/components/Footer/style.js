import styled from "styled-components";

export const ContentFooter = styled.div`
margin:"0px";
padding:0px;
height:25px;
display:flex;
justify-content:center;
align-items:center;
border-top:1px solid #D8D8D8;
  color:#D8D8D8;  
  background-color:#fff;
@media(max-width:767.5px){
  width:100% !important;
  position:fixed;
  bottom:0px;
}
@media (max-width: 576px) {
  font-size: 13px;
}
@media (max-width: 425px) {
  font-size: 10px;
}
`

export const Row = styled.div`
@media (max-width:767.5px){
  display:none;
}
`