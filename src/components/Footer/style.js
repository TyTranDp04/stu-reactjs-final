import styled from "styled-components";

export const ContentFooter = styled.div`
margin:"0px";
padding:0px;
height:50px;
display:flex;
justify-content:center;
align-items:center;
    border-top:1px solid #D8D8D8;
    color:#686868;  
    background-color:#fff;
@media(max-width:767.5px){
    width:100% !important;
    position:fixed;
    bottom:0px;
}
`

export const Row = styled.div`
@media (max-width:767.5px){
    display:none;
}
`