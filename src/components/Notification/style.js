import styled from "styled-components"
export const Container = styled.div`
  position: relative; 
  .hideAffter{
    &::after{
      display: none;
    }
  }
`
export const HeaderIcon = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  margin: 0 30px 0 20px;
  &:hover {
    svg{
      font-size: 22px;
      color: #fff!important;
      opacity: 0.8;
      cursor: pointer;
    }
    span{
      opacity: 0.8;
      cursor: pointer;
    }
  }
  svg{
    font-size: 22px;
    color: #fff!important;
  }
  
  &::after{
    z-index: 20;
    content:'';
    right: 4%;
    top: 120%;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #fff;
    display: block;
    position: absolute;
  }
`
export const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  top: -4px;
  font-weight: 500;
  left: 20px;
  border-radius: 10px;
  color: red;
  text-align: center;
  position: absolute;
  background-color: #fff;
`
export const Item = styled.li`
    padding: 5px 10px;
    display: flex;
    align-items: start;
    flex-direction: column;
    color: #000;
    font-size: 16px;
    opacity: 1;
    width: 100%;
    border-bottom: 1px solid #ccc;
    background-color: #F0F4F7;
    &:hover{
      background-color: #fff;
    }
   
`
export const Menu = styled.div`
margin-top: 0px;
max-height: 400px;
overflow: auto;
a{
  text-decoration: none;
  &:last-child li{
    border-bottom: none;
  }
}
`
export const H3 = styled.h3`
   color: #fff;
   font-weight: 700;
   font-size: 20px;
   width: 100%;
   line-height: 10px;
`
export const HeadPopup = styled.div`
border-bottom: 1px solid;
height:100%;
padding-bottom: 5px;
`
export const P = styled.div``

export const B = styled.b`
`
export const Content = styled.div`
@keyframes growDown {
  0% {
      transform: scaleY(0)
  }
  80% {
      transform: scaleY(1.1)
  }
  100% {
      transform: scaleY(1)
  }
}
  position: absolute;
  border-radius: 10px;
  padding: 20px 0 0 0;
  top: 165%;
  right: 0;
  width: 300px;
   z-index: 10;
   animation: growDown 300ms ease-in-out;
   transform-origin: top center;
   background-color: #fff;
   overflow: hidden;
   box-shadow: 0 0 3px rgb(136, 135, 135);
   background-color: #8000ff;
`
export const Reason = styled.div`
text-align: start;
max-width: 280px;
max-height: 50px;
overflow: hidden;
overflow: hidden;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
`

export const ItemContent = styled.div`

`
export const Name = styled.div`
text-align: start;
display:flex;
width: 100%;
`
export const Date = styled.div`
  display: flex;
`
export const H4 = styled.h4`
  font-size: 16px;
`