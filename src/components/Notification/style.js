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
  margin: 0 20px 0 10px;
  &:hover {
    svg{
      font-size: 22px;
      color: #8000FF!important;
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
    color: #8000FF!important;
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
    border-bottom: 12px solid #8000FF;
    display: block;
    position: absolute;
  }
`
export const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  top: -4px;
  font-weight: 500;
  left: 20px;
  border-radius: 10px;
  color: red;
  font-size: 12px;
  text-align: center;
  position: absolute;
  background-color: #8000FF;
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
  width: 250px;
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
max-width: 200px;
max-height: 50px;
font-size: 14px;
overflow: hidden;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
`
export const ReasonChange = styled.div`
text-align: start;
max-width: 230px;
max-height: 60px;
overflow: hidden;
font-size: 14px;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
display: -webkit-box;
`
export const ItemContent = styled.div`
width: 100%;

`
export const BtnReadAll = styled.button`
  position: sticky;
  bottom: -2px;
  border: none;
  width: 100%;
  height: 30px;
  background-color: #8000FF;
  color: #fff;
  &:hover{
    background-color: #9933FF;
  }
`
export const ContentStatus = styled.div`
  display: block;
  .Rejected{
    color: red!important;
  }
  .New{
    color: #FECB09 !important;
  }
  .change{
    color: #85CBA6 !important;
  }
  .Reverted{
    color: #C66DAD !important;
  }
  .group{
    color: #8000FF !important;
  }
  .Approved{
    color: #5BD646 !important;
  }
`
export const ContentDayOff = styled.div`
  border-radius: 5px;
  width: 100%;
  border: 2px solid #8000FF;
  padding: 5px;
  margin-bottom: 4px;
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
  font-size: 14px;
`