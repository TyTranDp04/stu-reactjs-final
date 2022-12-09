import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderRow = styled.div`
  background-color: #00aeef;
`
export const HeaderWrapper = styled.div`
`
export const HeaderBg = styled.div`
  background-color: #4B5C6B;
  height: 30px;
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
export const StImg = styled.img`
 
  height: auto;
  
`
export const HeaderLogoff = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

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
  background-color: #00aeef;
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